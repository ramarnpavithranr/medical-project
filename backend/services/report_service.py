import os
import io
from typing import Dict, Any
from datetime import datetime

from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image as RLImage, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")
REPORTS_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "reports")
os.makedirs(REPORTS_DIR, exist_ok=True)

def generate_pdf_report(record: Dict[str, Any]) -> str:
    """
    Generates a structured, beautifully styled Nuvica Medical cardiology report in PDF format.
    Returns the absolute path to the generated PDF.
    """
    analysis_id = record.get("id", "UNKNOWN-ID")
    report_filename = f"Report_{analysis_id}.pdf"
    pdf_path = os.path.join(REPORTS_DIR, report_filename)

    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Custom Medical Report Styles
    navy = colors.HexColor("#0f2347")
    ice_blue = colors.HexColor("#e8f3fc")
    border_color = colors.HexColor("#cbd5e1")
    text_dark = colors.HexColor("#1e293b")
    text_muted = colors.HexColor("#64748b")
    alert_red = colors.HexColor("#b91c1c")
    green_accent = colors.HexColor("#10b981")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        textColor=navy,
        spaceAfter=2
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        textColor=text_muted,
        spaceAfter=12
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        textColor=navy,
        spaceBefore=8,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        'ReportBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=text_dark
    )

    bold_label = ParagraphStyle(
        'BoldLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=13,
        textColor=navy
    )

    disclaimer_style = ParagraphStyle(
        'DisclaimerText',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=7.5,
        leading=10,
        textColor=text_muted
    )

    elements = []

    # 1. Header with Nuvica Hospital Branding
    header_data = [
        [
            Paragraph("<b>NUVICA MEDICAL HEALTHCARE</b><br/><font size=8 color='#2563eb'>Division of Cardiology & Vascular AI Analysis</font>", title_style),
            Paragraph("<b>CONFIDENTIAL MEDICAL REPORT</b><br/><font size=8>Document ID: " + analysis_id + "<br/>Generated: " + datetime.now().strftime('%d %b %Y, %H:%M') + "</font>", subtitle_style)
        ]
    ]
    header_table = Table(header_data, colWidths=[3.8 * inch, 3.4 * inch])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('ALIGN', (1, 0), (1, 0), 'RIGHT'),
    ]))
    elements.append(header_table)
    elements.append(HRFlowable(width="100%", thickness=1.5, color=navy, spaceBefore=4, spaceAfter=10))

    # 2. Study Overview Table
    meta_info = [
        [
            Paragraph("<b>Patient Study ID:</b>", bold_label),
            Paragraph(analysis_id, body_style),
            Paragraph("<b>Modality:</b>", bold_label),
            Paragraph(record.get("modality_name", "Cardiovascular"), body_style),
        ],
        [
            Paragraph("<b>Analysis Date:</b>", bold_label),
            Paragraph(record.get("created_at", "-"), body_style),
            Paragraph("<b>Analysis Status:</b>", bold_label),
            Paragraph(f"<font color='{green_accent}'><b>{record.get('status', 'Completed').upper()}</b></font>", body_style),
        ],
        [
            Paragraph("<b>Model Name:</b>", bold_label),
            Paragraph(record.get("model_name", "Nuvica AI"), body_style),
            Paragraph("<b>Model Version:</b>", bold_label),
            Paragraph(record.get("model_version", "1.0.0"), body_style),
        ],
        [
            Paragraph("<b>Source File:</b>", bold_label),
            Paragraph(record.get("filename", "scan.dcm"), body_style),
            Paragraph("<b>File Size:</b>", bold_label),
            Paragraph(f"{record.get('file_size_kb', 0)} KB", body_style),
        ]
    ]
    meta_table = Table(meta_info, colWidths=[1.6 * inch, 2.0 * inch, 1.6 * inch, 2.0 * inch])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), ice_blue),
        ('BOX', (0, 0), (-1, -1), 0.5, border_color),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, border_color),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    elements.append(meta_table)
    elements.append(Spacer(1, 10))

    # 3. Model Predictions & Primary Findings
    elements.append(Paragraph("1. Automated AI Screening Findings", section_heading))
    predictions = record.get("predictions", {})
    finding = predictions.get("primary_finding", "No finding recorded")
    conf = predictions.get("confidence", 0.0)
    conf_text = f"{conf:.1%}" if conf > 0 else "N/A (Unconfigured Model)"

    pred_table_data = [
        [Paragraph("<b>Primary Screened Finding</b>", bold_label), Paragraph(f"<b>{finding}</b>", body_style)],
        [Paragraph("<b>Model Confidence Score</b>", bold_label), Paragraph(f"<b>{conf_text}</b> (Mathematical classifier certainty; not probability of disease)", body_style)]
    ]

    metrics = predictions.get("metrics", {})
    if metrics:
        metric_str = ", ".join([f"<b>{k}:</b> {v}" for k, v in metrics.items()])
        pred_table_data.append([Paragraph("<b>Key Quantitative Metrics</b>", bold_label), Paragraph(metric_str, body_style)])

    pred_table = Table(pred_table_data, colWidths=[2.2 * inch, 5.0 * inch])
    pred_table.setStyle(TableStyle([
        ('BOX', (0, 0), (-1, -1), 0.5, border_color),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, border_color),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor("#f8fafc")),
    ]))
    elements.append(pred_table)
    elements.append(Spacer(1, 10))

    # 4. Embedded Visualizations (ECG Strip or CXR Grad-CAM)
    preview_url = record.get("preview_url")
    heatmap_url = record.get("heatmap_url")

    img_elements = []
    if preview_url:
        preview_filename = os.path.basename(preview_url)
        preview_disk = os.path.join(UPLOAD_DIR, preview_filename)
        if os.path.exists(preview_disk):
            try:
                # ECG strip is wide, CXR is square
                if record.get("modality") == "ecg":
                    img_elements.append([Paragraph("<b>ECG Lead II Tracing & Waveform Extraction</b>", bold_label)])
                    img_elements.append([RLImage(preview_disk, width=6.8 * inch, height=2.2 * inch)])
                else:
                    row = [Paragraph("<b>Original Uploaded Radiograph</b>", bold_label)]
                    imgs = [RLImage(preview_disk, width=3.3 * inch, height=3.3 * inch)]
                    if heatmap_url:
                        heat_filename = os.path.basename(heatmap_url)
                        heat_disk = os.path.join(UPLOAD_DIR, heat_filename)
                        if os.path.exists(heat_disk):
                            row.append(Paragraph("<b>Grad-CAM Spatial Attribution Map</b>", bold_label))
                            imgs.append(RLImage(heat_disk, width=3.3 * inch, height=3.3 * inch))
                    img_elements.append(row)
                    img_elements.append(imgs)
            except Exception as e:
                print(f"[REPORT] Error attaching image to PDF: {e}")

    if img_elements:
        elements.append(Paragraph("2. Visual Imaging & Waveform Evidence", section_heading))
        img_table = Table(img_elements)
        img_table.setStyle(TableStyle([
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('TOPPADDING', (0, 0), (-1, -1), 3),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ]))
        elements.append(img_table)
        elements.append(Spacer(1, 8))

    # 5. Explainable Interpretation
    elements.append(Paragraph("3. Explainable AI Interpretation & Method", section_heading))
    explanation = record.get("explanation", {})
    exp_summary = explanation.get("summary", "Automated feature analysis.")
    exp_notes = explanation.get("notes", [])
    notes_html = "<br/>• ".join([""] + exp_notes) if exp_notes else ""

    exp_para = Paragraph(f"<b>Methodology:</b> {explanation.get('method', 'Deep Feature Analysis')}<br/><br/><b>Clinical Summary:</b> {exp_summary}<br/><br/><b>Methodological Attribution Notes:</b>{notes_html}", body_style)
    elements.append(exp_para)
    elements.append(Spacer(1, 10))

    # 6. Clinical Guidance & Next Steps
    guidance = record.get("clinical_guidance", {})
    specialist = guidance.get("specialist_recommendation", "Board-Certified Cardiologist")
    rec_exams = guidance.get("recommended_examinations", [])
    exams_html = ", ".join(rec_exams) if rec_exams else "Comprehensive clinical evaluation"

    elements.append(Paragraph("4. Recommended Clinical Pathway & Specialists", section_heading))
    guidance_data = [
        [Paragraph("<b>Recommended Specialist</b>", bold_label), Paragraph(specialist, body_style)],
        [Paragraph("<b>Suggested Diagnostic Tests</b>", bold_label), Paragraph(exams_html, body_style)],
    ]
    guidance_table = Table(guidance_data, colWidths=[2.2 * inch, 5.0 * inch])
    guidance_table.setStyle(TableStyle([
        ('BOX', (0, 0), (-1, -1), 0.5, border_color),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, border_color),
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor("#f8fafc")),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    elements.append(guidance_table)
    elements.append(Spacer(1, 10))

    # 7. Urgent Safety Warning & Disclaimer Box
    emergency = guidance.get("emergency_warning", "For severe acute chest pain or fainting, immediately dial emergency services.")
    disclaimer = guidance.get("safety_disclaimer", "This AI-assisted screening tool is intended for educational and decision-support purposes. Its outputs are not a confirmed diagnosis and must not replace professional medical evaluation.")

    safety_box = [
        [Paragraph(f"<b><font color='{alert_red}'>CRITICAL EMERGENCY SAFETY ADVISORY:</font></b><br/>{emergency}", body_style)],
        [Paragraph(f"<b>REGULATORY MEDICAL DISCLAIMER:</b> {disclaimer}", disclaimer_style)]
    ]
    safety_table = Table(safety_box, colWidths=[7.2 * inch])
    safety_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#fef2f2")),
        ('BACKGROUND', (0, 1), (-1, 1), colors.HexColor("#f8fafc")),
        ('BOX', (0, 0), (-1, -1), 1, alert_red),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, border_color),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    elements.append(KeepTogether(safety_table))

    # Build Document
    doc.build(elements)
    return pdf_path
