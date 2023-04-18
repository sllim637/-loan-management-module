import { HttpService } from '@nestjs/axios';
import { EventPattern } from '@nestjs/microservices';
import { Controller, Post, Body, Res } from '@nestjs/common';
import { PdfService, PDFRenderOptions } from './pdf.service';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfMaker: PdfService, private readonly httpService: HttpService) {}

  /**
   * Render PDF From Url
   */
   @EventPattern('page_url')
  async postRenderFromUrl(url

  ) {
    let res  = new Response()
    console.log('the url is : ' , url)
    const buffer = await this.pdfMaker.renderPdfFromUrl(url, {
      screen: false,                 
      page: {
          format: "A4",               
          landscape: false,           
          height: null,           
          width: null               
      }});
      console.log("the buffer content is : " , buffer)
      const base64 = this.responseAsPdf(true, buffer, "loanDocument")
      return this.httpService.post('http://localhost:3000/savePdfDocument', base64)
      
  }

  /**
   * Render PDF From HTML
   */
  // @Post('render-html')
  // async postRenderFromHtml(
  //   @Res() res: Response,
  //   @Body('html') html: string,
  //   @Body('filename') filename?: string,
  //   @Body('json') json?: boolean,
  //   @Body('options') options?: PDFRenderOptions,
  // ) {
  //   const buffer = await this.pdfMaker.renderPdfFromHtml(html, options);
  //   this.responseAsPdf(json, buffer, res, filename);
  // }

  private responseAsPdf(
    json: boolean,
    buffer: Buffer,
    filename: string,
  ) {
    if (!json) {
      const stream = this.pdfMaker.createReadableStream(buffer)
      
    } else {
   
      // res.status(200).send({
      //   content: buffer.toString('base64'),
      //   filename: filename || 'result.pdf',
      //   mimeType: 'application/pdf',
      // });
    }
    return  buffer.toString('base64')
  }
}
