import {NextApiRequest, NextApiResponse} from "next";
import db from "@/lib/db";
import PdfPrinter from "pdfmake";

// Define fonts for pdfmake
const fonts = {
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf',
    },
};

const printer = new PdfPrinter(fonts);

// Function to generate PDF content
const generatePdfContent = ({padronData, avisosData, padeudos1Data, padeudos2Data}) => {
    const docDefinition = {
        content: [
            // Example conversion of HTML/CSS to pdfmake format
            // Image: 'escudo.jpg'
            {
                image: 'path/to/escudo.jpg',
                width: 45, // Adjust size as needed
                absolutePosition: {x: 70, y: 20}
            },
            {
                image: 'path/to/firmajesus.png',
                width: 25, // Adjust size as needed
                absolutePosition: {x: 120, y: 893}
            },
            // Text with styling
            {
                text: `Fecha: ${avisosData.fecha}`,
                style: 'header',
                alignment: 'right',
            },
            {
                text: `Propietario: ${padronData.propietarios}`,
                style: 'textElement'
            },
            {
                text: `Dom.Fiscal: ${padronData.fcalle} NÚM. ${padronData.fnum} ${padronData.fcol}`,
                style: 'textElement'
            },
            {
                text: avisosData.pa11,
                style: 'styledSection'
            },
            {
                text: avisosData.parrafo1,
                style: 'styledParagraph'
            },
            {
                table: {
                    headerRows: 1,
                    widths: ['auto', '*', 'auto', 'auto'], // Define widths as per original script
                    body: [
                        // Header row with styles
                        ['Column1', 'Column2', 'Column3', 'Column4'].map(header => ({
                            text: header,
                            style: 'tableHeader'
                        })),
                        // Data rows
                        ...data.someTableData.map(row => [
                            row.column1, row.column2, row.column3, row.column4
                        ].map(cell => ({text: cell, style: 'tableCell'}))),
                    ],
                },
                layout: 'lightHorizontalLines', // Choose an appropriate layout
            },

            // More content based on the PHP script...
        ],
        styles: {
            textElement: {
                fontSize: 10,
                bold: true,
                margin: [0, 5, 0, 0] // Adjust margins as needed
            },
            styledSection: {
                bold: true,
                fontSize: 16,
                background: '#f00021', // Adjust color as needed
                alignment: 'right'
            },
            header: {
                fontSize: 18,
                bold: true,
            },
            tableHeader: {
                bold: true,
                fontSize: 10,
                alignment: 'center'
            },
            tableCell: {
                fontSize: 9
            },
            styledParagraph: {
                fontSize: 10,
                alignment: 'justify',
                margin: [0, 5, 0, 5]
            },
            // Additional styles as needed
        },
    };

    return docDefinition;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {cta, fol} = req.query;

    try {
        const padronData = await db.padron.findMany({
            where: {
                pcuenta: cta?.toString(),
                pfolio: fol?.toString(),
            },
        });

        const avisosData = await db.avisos.findMany({
            where: {
                idaviso: 1,
            },
        });

        const padeudos1Data = await db.padeudos1.findMany({
            where: {
                acuenta: cta,
                afolio: fol,
            }
        });

        const padeudos2Data = await db.padeudos2.findMany({
            where: {
                acuenta: cta,
                afolio: fol,
            }
        });

        const pdfDocDefinition = generatePdfContent({padronData, avisosData, padeudos1Data, padeudos2Data});

        // Create a PDF Stream
        const pdfDoc = printer.createPdfKitDocument(pdfDocDefinition);
        let chunks = []
        pdfDoc.on('data', chunks.push(chunk));
        pdfDoc.on('end', () => {
            const result = Buffer.concat(chunks);
            res.setHeader('Content-Type', 'application/pdf');
            res.send(result);
        });

        pdfDoc.end();

        res.status(200).json(padronData);


    } catch (error) {
        console.error("Error al obtener el padron: ", error);
        res.status(500).json({error: "Error al obtener el padron"});
    } finally {
        await db.$disconnect();
    }
}