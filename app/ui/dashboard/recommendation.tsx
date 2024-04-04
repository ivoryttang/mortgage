export default async function Recommendation(
    {
        result,
      }: {
        result: string;
      }
){
    
    return (
        <div>{/* show agent working */}
        {result}
        {/* 1. Show transcript of call being processed */}
        {/* 2. Show documents being processed */}
        {/* 3. Narrow down lenders that fall within requirements - show lender comparisons */}
        {/* 4. Find loan option that borrower is looking for */}
        {/* 5. Perform any adjustments based on borrower situation */}
        {/* 6. Generate explanation with corresponding explanations */}
        {/* 7. Show proprietary algorithm determining likelihood borrower is to get this loan */}</div>
    )
}




