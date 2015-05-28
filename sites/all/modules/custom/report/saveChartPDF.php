<?php
 
if (isset($_POST['htmlContent']) && $_POST['htmlContent'] != '')
{
    require_once '/dompdf/dompdf_config.inc.php';
 
    $file_name = 'data.pdf';
    $html = $_POST['htmlContent'];
 
    $dompdf = new DOMPDF();
    $dompdf->load_html($html);
    $dompdf->render();
    $dompdf->stream($file_name);
}