//@ts-nocheck
import { User } from "next-auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs";

// export const middleware = async( request: NextRequest ) => {
//   const headersList = headers();
//   const authHeader = headersList.get('authorization');
//   const cookieHeader = headersList.get('cookie');

//   const session:session = await fetch(`${process.env.serverURL}/api/auth/session`, {
//     headers: {
//       "authorization": authHeader, //might not be needed
//       "cookie": cookieHeader
//     },
//   })
//   .then( async( res ) => await res.json() );

//   const loggedIn = Object.keys(session).length > 0? true :false;
//   const pathname = request.nextUrl.pathname;

//   if ( pathname != "/admin/login" && !loggedIn ){
//     return NextResponse.redirect( new URL( '/admin/login', process.env.serverURL ) );
//   }

// }
export default authMiddleware({
  publicRoutes: ['/','/sign-in','/sign-up','/preapproval','/closing-costs','/document-processing','/borrower','/faqs','/gds-tds','/heloc','/housing-market','/mortgage-affordability','/mortgage-calc','/mortgage-pricing','/private-mortgage','/refinance','/renewal','/rent-to-own','/second-mortgage','/taxes','/why-domus','/ai-agent','/ai-origination','/blog']//,'/dashboard','/dashboard/communications','/dashboard/loans','/dashboard/lenders','/dashboard/learn','/dashboard/documents','/dashboard/reports','/dashboard/loan-application','/dashboard/loan-processing','/dashboard/automations','/dashboard/integrations']
});
// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)"],
// };
// export const config = {
//   matcher : ["/admin/:path*"]
// }

type session = {} | User;