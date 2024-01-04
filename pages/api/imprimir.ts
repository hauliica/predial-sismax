import { NextApiRequest, NextApiResponse } from "next";
import { PDFDownloadLink, Document, Page} from '@react-pdf/renderer';
import db from "@/lib/db";

export default async function hander(req: NextApiRequest, res: NextApiResponse) {
    const { cta, fol} = req.query;

    console.log('API', cta, fol);
}