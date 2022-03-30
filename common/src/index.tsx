import pdf from "@react-pdf/renderer"
// Workaround needed for Vite as react-pdf's ES module export is somewhat
// messed up (https://github.com/vitejs/vite/issues/3405#issuecomment-855230747)
const { Document, Page, PDFViewer, Text } = pdf

export const InvoicePDF = () => (
  <Document>
    <Page>
      <Text>Hello world!</Text>
    </Page>
  </Document>
)

export const InvoicePreview = () => (
  <PDFViewer>
    <InvoicePDF />
  </PDFViewer>
)
