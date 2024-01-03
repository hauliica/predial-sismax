import {type NextRequest} from "next/server";

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    console.log(params);
    return Response.json(params);
}