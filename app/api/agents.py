# from typing import List, Tuple, Optional
# from PIL import Image 
# from models import GroundingDINO, QwenVL, GPT4Vision, CLIP
# from dataclasses import dataclass, field
# from types import *
# import numpy as np

# # from crewai import Agent
# # import streamlit as st
# # from langchain_community.llms import OpenAI

# # from tools.browser_tools import BrowserTools
# # from tools.calculator_tools import CalculatorTools
# # from tools.search_tools import SearchTools
# # from tools.ratesheet_tools import RatesheetTools
# import openai

# class BoundingBoxSelectAgent(SplitAgent):
#     def __init__(self, classes: List[str], model: Optional[BoundingBoxModel] = None, split: bool = False):
#         self.classes = classes
#         self.model = model if model is not None else GroundingDINO()
#         self.split = split      
    
#     def execute(self, image: Image.Image) -> ExecutionNode:
#         return ExecutionNode(image, self.model.detect(image, self.classes))
    
#     def execute_split(self, image: Image.Image) -> List[ExecutionNode]:
#         detections = self.model.detect(image, self.classes)
#         result : List[ExecutionNode] = []
#         for detection in  detections.split():
#             parent_xyxy=detection.xyxy[0]
#             child_image = image.crop(parent_xyxy)
#             child_detection = Detections(
#                 xyxy=np.array([[0, 0, child_image.width, child_image.height]]),
#                 class_ids=detection.class_ids,
#                 confidence=detection.confidence,
#                 classes=detection.classes,
#                 data=detection.data,
#                 detection_type=DetectionType.CLASSIFICATION
#             )
            
#             result.append(ExecutionNode(image.crop(detection.xyxy[0]), child_detection, parent_detection=detection))
            
#         return result 
    
#     def is_split(self) -> bool:
#         return self.split

# # Convert binary_choice into an agent class
# class BinaryChoiceAgent(ImageAgent):
#     def __init__(self, query: str, model:Optional[MultimodalLLM] = None):
#         self.query = query
#         self.model = model if model is not None else QwenVL()

#     def execute(self, image: Image.Image)-> ExecutionNode:
#         prompt = f"""{self.query}"""
#         response = self.model.prompt_with_image(image, prompt)
#         truthy = "yes" in response.lower()
        
#         detection_type = DetectionType.CLASSIFICATION
#         class_ids = [0] if truthy else [1]
#         classes = ['yes', 'no']
#         confidence = [1.0]  
        
#         full_image_box = np.array([0, 0, image.width, image.height]).reshape(1, -1)
        
#         detection = Detections(
#             xyxy=full_image_box,  # No bounding box for classification
#             detection_type=detection_type,
#             confidence=np.array(confidence),
#             class_ids=np.array(class_ids),
#             classes=classes,
#             data={'response': [response]}
#         )
#         node = ExecutionNode(image, detection)

#         return node

# class ClassificationAgent(ImageAgent):
#     def __init__(self, classes, model: Optional[ClassificationModel] = None):
#         self.classes = classes
#         self.model = model if model is not None else CLIP()

#     def execute(self, image: Image.Image)-> ExecutionNode:
#         selected_class = self.model.classify(image, self.classes)
#         return ExecutionNode(image, selected_class)

# class OCRAgent(ImageAgent):
#     def __init__(self, model: Optional[OCRModel] = None):
#         self.model = model if model is not None else GPT4Vision()

#     def execute(self, image: Image.Image)-> ExecutionNode:
#         response = self.model.parse_text(image)
#         return ExecutionNode(image, response)

# class JoinAgent(Agent):
#     def __init__(self):
#         self.info = {}

#     # Mutates the input graph by adding a new layer of child nodes
#     def join(self, start: List[ExecutionNode], input:ExecutionGraph) -> List[ExecutionNode]:
        
#         parents = [x for x in start]
#         while True:
#             parents = [input.parent_of(item) for item in parents]
#             if len(parents) == 0:
#                 raise ValueError("No parents found")
#             some_have_parents = any(parent.parent_detection is not None for parent in parents)
#             all_have_parents = all(parent.parent_detection is not None for parent in parents)
            
#             if some_have_parents and not all_have_parents:
#                 raise ValueError("Some detections have parents, but not all")
            
#             if all_have_parents:
#                 break
        

#         leaves = []
        
#         def merge_nodes(nodes: List[ExecutionNode], parent: ExecutionNode):
#             if len(nodes) == 0:
#                 return
            
#             # Create a new node with the merged data
#             merged_node = ExecutionNode(parent.image, None)
            
#             # Point all original nodes to the new merged node
#             for node in nodes:
#                 input.add_child(node, merged_node)

#             leaves.append(merged_node)

        
#         # parent_ids : List[int] = [input.parent_of(item).id for item in parents]
#         parents = [input.parent_of(item) for item in parents]
#         current_parent_id = None
#         current_group : List[ExecutionNode] = []
#         for cur, parent in sorted(zip(start, parents), key=lambda x: x[1].id):
#             if parent.id != current_parent_id:
#                 merge_nodes(current_group, parent)
#                 current_parent_id = parent.id
#                 current_group = [cur]
#             else:
#                 current_group.append(cur)
        
#         if len(current_group) > 0:
#             merge_nodes(current_group, parent)
        

#         return leaves
  


# @dataclass
# class Workflow:
#     steps: List[Agent] = field(default_factory=list)

#     def add_step(self, agent: Agent):
#         """Add a processing step to the workflow."""
#         self.steps.append(agent)

#     # Return leaves of the graph and the graph itself
#     def execute(self, input_image: Image.Image) -> Tuple[List[ExecutionNode], ExecutionGraph]:
        
#         # intermediate_results: List[Tuple[ImageNode, List[Detections]]] = [(ImageNode(input_image), [])]
#         root = ExecutionNode(input_image, None)
#         graph = ExecutionGraph(root)

#         intermediate_results = [root]
#         for ind, agent in enumerate(self.steps):
#             if isinstance(agent, JoinAgent):
#                 intermediate_results = agent.join(intermediate_results, graph)
#             elif isinstance(agent, SplitAgent):
#                 if agent.is_split():
#                     res = []
#                     for node in intermediate_results:
#                         children = agent.execute_split(node.image)
#                         res.extend(children)
#                         for child in children:
#                             graph.add_child(node, child)
#                     intermediate_results = res
#                 else:
#                     res = []
#                     for node in intermediate_results:
#                         child = agent.execute(node.image)
#                         graph.add_child(node, child)
#                         res.append(child)
#                     intermediate_results = res
#             elif isinstance(agent, ImageAgent):
#                 res = []
#                 for node in intermediate_results:
#                     child = agent.execute(node.image)
#                     graph.add_child(node, child)
#                     res.append(child)
#                 intermediate_results = res
#             else:
#                 raise TypeError(f"Unsupported agent type: {type(agent)}")
                              
#         return intermediate_results, graph
    

# def streamlit_callback(step_output):
#     # This function will be called after each step of the agent's execution
#     st.markdown("---")
#     for step in step_output:
#         if isinstance(step, tuple) and len(step) == 2:
#             action, observation = step
#             if isinstance(action, dict) and "tool" in action and "tool_input" in action and "log" in action:
#                 st.markdown(f"# Action")
#                 st.markdown(f"**Tool:** {action['tool']}")
#                 st.markdown(f"**Tool Input** {action['tool_input']}")
#                 st.markdown(f"**Log:** {action['log']}")
#                 st.markdown(f"**Action:** {action['Action']}")
#                 st.markdown(
#                     f"**Action Input:** ```json\n{action['tool_input']}\n```")
#             elif isinstance(action, str):
#                 st.markdown(f"**Action:** {action}")
#             else:
#                 st.markdown(f"**Action:** {str(action)}")

#             st.markdown(f"**Observation**")
#             if isinstance(observation, str):
#                 observation_lines = observation.split('\n')
#                 for line in observation_lines:
#                     if line.startswith('Title: '):
#                         st.markdown(f"**Title:** {line[7:]}")
#                     elif line.startswith('Link: '):
#                         st.markdown(f"**Link:** {line[6:]}")
#                     elif line.startswith('Snippet: '):
#                         st.markdown(f"**Snippet:** {line[9:]}")
#                     elif line.startswith('-'):
#                         st.markdown(line)
#                     else:
#                         st.markdown(line)
#             else:
#                 st.markdown(str(observation))
#         else:
#             st.markdown(step)


# class Agents():

#     def borrower_profile_analyzer(self):
#         return Agent(
#             role='Loan officer',
#             goal='Gather Borrower information and summarize important points',
#             backstory='An expert in analyzing borrower information to help assess loan qualification',
#             tools=[
#                 SearchTools.search_internet,
#                 BrowserTools.scrape_and_summarize_website,
#             ],
#             verbose=True,
#             step_callback=streamlit_callback,
#         )

#     def ratesheet_expert(self):
#         return Agent(
#             role='Ratesheet Expert',
#             goal='Understand complex ratesheets to find best rates for borrower',
#             backstory="""A knowledgeable loan processor who knows how to understand ratesheets and find rates that make sense for each borrower""",
#             tools=[
#                 RatesheetTools.scrape_and_summarize_EMET_ratesheet,
#                 RatesheetTools.scrape_and_summarize_provident_funding_ratesheet,
#                 RatesheetTools.scrape_and_summarize_NMSI_ratesheet,
#                 RatesheetTools.scrape_and_summarize_pacific_bay_ratesheet,
#                 RatesheetTools.scrape_and_summarize_preferred_rate_ratesheet,
#                 RatesheetTools.scrape_and_summarize_rocket_mortgage_ratesheet,
#                 RatesheetTools.scrape_and_summarize_PRMG_ratesheet
#             ],
#             verbose=True,
#             step_callback=streamlit_callback,
#         )

#     def loan_processor(self):
#         return Agent(
#             role='Loan Processor',
#             goal="""Calculate the rate and terms and conditions for the loan product suited for this borrower""",
#             backstory="""Specialist in taking ratesheet and borrower information and making a loan assessment""",
#             tools=[
#                 CalculatorTools.calculate,
#             ],
#             verbose=True,
#             step_callback=streamlit_callback,
#         )
    
#     def loan_advisor(self):
#         return Agent(
#             role='Loan Advisor',
#             goal="""Explain the loan decision to the borrower, including and caveats and specific terms.""",
#             backstory="""Specialized in giving relevant loan advice and summarizing loan processing results to the borrower.""",
#             tools=[
#                 SearchTools.search_internet,
#                 BrowserTools.scrape_and_summarize_website
#             ],
#             verbose=True,
#             step_callback=streamlit_callback,
#         )