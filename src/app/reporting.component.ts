import { Component, OnInit, Renderer, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { MenuItem, TreeNode, SlideMenu, Menu, OverlayPanel } from 'primeng/primeng';
import { IGridColumn, IGridColumnSummary } from './reporting-grid.component';
import { FormControl, FormGroup } from '@angular/forms';
import { ITextBox } from './reporting-textbox.component';
import { DragulaService } from 'ng2-dragula';
import { Observable } from 'rxjs';
import * as JsReport from 'jsreport-browser-client-dist';

const content1: string = `
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html>
<head>
<title>Advent Browser Reporting - Summary</title>
<style type="text/css" media=print>
<!--
    tr.S0-FirmName { font-size: 11pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S0-RepTitle { font-size: 14pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S0-PortName { font-size: 12pt; font-family: "Calibri"; font-weight: bold; font-style: italic; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S0-Date { font-size: 10pt; font-family: "Calibri"; font-weight: normal; font-style: italic; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S0-ColHeader { font-size: 8pt; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S0-SectHeader { font-size: 8pt; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none; page-break-before: auto; page-break-after: avoid; }
    tr.S0-Header { font-size: 10pt; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none; page-break-before: auto; page-break-after: avoid; }
    tr.S0-Detail { font-size: 8pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: auto; page-break-after: auto; }
    tr.S0-UnderLine { line-height: 0%; page-break-before: avoid; page-break-after: avoid; }
    tr.S0-SectSubtotal { font-size: 8pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: auto; }
    tr.S0-GrandTotal { font-size: 8pt; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: auto; }
    tr.S0-Warning { font-size: 8pt; font-family: "Calibri"; font-weight: bold; font-style: italic; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S0-Footnote { font-size: 8pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S0-Footer { font-size: 8pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
-->
</style>
<style type="text/css" media=screen>
<!--
    tr.S0-FirmName { font-size: 138%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S0-RepTitle { font-size: 175%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S0-PortName { font-size: 150%; font-family: "Calibri"; font-weight: bold; font-style: italic; text-decoration: none;  }
    tr.S0-Date { font-size: 125%; font-family: "Calibri"; font-weight: normal; font-style: italic; text-decoration: none;  }
    tr.S0-ColHeader { font-size: 100%; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none;  }
    tr.S0-SectHeader { font-size: 100%; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none;  }
    tr.S0-Header { font-size: 125%; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none;  }
    tr.S0-Detail { font-size: 100%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S0-UnderLine { line-height: 0%; page-break-before: avoid; page-break-after: avoid; }
    tr.S0-SectSubtotal { font-size: 100%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S0-GrandTotal { font-size: 100%; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none;  }
    tr.S0-Warning { font-size: 100%; font-family: "Calibri"; font-weight: bold; font-style: italic; text-decoration: none;  }
    tr.S0-Footnote { font-size: 100%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S0-Footer { font-size: 100%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
-->
</style>
<script language="JavaScript" type="text/javascript">
<!--
function fnAdventInit()
{
  // Get Browser Names and Versions //////////////////////////
  var bIsNetscape = false;
  var bIsMicrosoft = false;
  var nVersion = 0;
  var version = navigator.appVersion;
  version = version.toUpperCase();
  var index;
  if(navigator.appName == "Netscape")
  {
    bIsNetscape = true;
    index = version.indexOf(" ");
    if(index != -1)
    {
      version = version.substring(0, index);
      nVersion = parseFloat(version);
    }
  }
  else if(navigator.appName == "Microsoft Internet Explorer")
  {
    bIsMicrosoft = true;
    index = version.indexOf("MSIE");
    if(index != -1)
    {
      version = version.substring(index, version.length);
      index = version.indexOf(" ");
      version = version.substring(index, version.length);
      index = version.indexOf(";");
      if(index != -1)
      {
        version = version.substring(0, index);
        nVersion = parseFloat(version);
      }
    }
  }

  // Fix Pagination //////////////////////////////////////////
  var tagPageBreak = "";
  if(bIsNetscape)
  {
    if(nVersion >= 5)
    {
      tagPageBreak = "table";
    }
  }
  else if(bIsMicrosoft)
  {
    if(nVersion >= 5.5)
    {
      tagPageBreak = "table";
    }
    else
    {
      tagPageBreak = "div";
    }
  }
  if(tagPageBreak != "")
  {
    var collTable = document.getElementsByTagName(tagPageBreak);
    if (collTable!=null)
    {
      for (k=0; k<collTable.length; k++)
      {
        if (bIsMicrosoft && nVersion >= 7.0) // IE 7
        {
          if (k != collTable.length - 1)
            collTable[k].style.pageBreakAfter="always";
        }
        else
        {
          if(k > 0 || tagPageBreak == "div") // skip first table
          {
            collTable[k].style.pageBreakBefore="always";
          }
        }
      }
    }
  }
  // Fix Netscape 6.0 Footers ////////////////////////////////
  if(bIsNetscape && nVersion >= 5)
  {
    var collTable = document.getElementsByTagName("table");
    if(collTable == null)
    {
      return;
    }
    for(l=0; l<collTable.length; l++)
    {
      var collTBody = collTable[l].getElementsByTagName("tbody");
      if( collTBody == null)
      {
        break;
      }
      var collTFoot = collTable[l].getElementsByTagName("tfoot");
      if( collTFoot == null)
      {
        break;
      }
      if(collTBody.length == collTFoot.length)
      {
        var currentRow;
        var currentCell;
        for(i=0; i<collTBody.length; i++)
        {
          var currentTBody = collTBody.item(i);
          var currentTFoot = collTFoot.item(i);
          var collTR = currentTFoot.childNodes;
          if (collTR!=null)
          {
            for (j=0; j<collTR.length; j++)
            {
              if(collTR.item(j).tagName == "TR")
              {
                currentRow = document.createElement("TR");
                currentCell = document.createElement("TD");
                var collTD = collTR.item(j).childNodes;
                currentCell.appendChild(document.createTextNode(collTD.item(1).firstChild.data));
                currentCell.align = collTD.item(1).align;
                currentCell.colSpan = collTD.item(1).colSpan;
                currentRow.appendChild(currentCell);
                currentTBody.appendChild(currentRow);
                currentTFoot.removeChild(collTR.item(j));
              }
            }
          }
        }
      }
    }
  }
}
//-->
</script>
<script language="JavaScript" type="text/javascript">
<!--
window.onload=fnAdventInit;
//-->
</script>
<style type="text/css" media=print>
<!--
    tr.S1-FirmName { font-size: 11pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S1-RepTitle { font-size: 14pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S1-PortName { font-size: 12pt; font-family: "Calibri"; font-weight: bold; font-style: italic; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S1-Date { font-size: 10pt; font-family: "Calibri"; font-weight: normal; font-style: italic; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S1-ColHeader { font-size: 8pt; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S1-SectHeader { font-size: 8pt; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none; page-break-before: auto; page-break-after: avoid; }
    tr.S1-Header { font-size: 10pt; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none; page-break-before: auto; page-break-after: avoid; }
    tr.S1-Detail { font-size: 8pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: auto; page-break-after: auto; }
    tr.S1-UnderLine { line-height: 0%; page-break-before: avoid; page-break-after: avoid; }
    tr.S1-SectSubtotal { font-size: 8pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: auto; }
    tr.S1-GrandTotal { font-size: 8pt; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: auto; }
    tr.S1-Warning { font-size: 8pt; font-family: "Calibri"; font-weight: bold; font-style: italic; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S1-Footnote { font-size: 8pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S1-Footer { font-size: 8pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
-->
</style>
<style type="text/css" media=screen>
<!--
    tr.S1-FirmName { font-size: 138%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S1-RepTitle { font-size: 175%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S1-PortName { font-size: 150%; font-family: "Calibri"; font-weight: bold; font-style: italic; text-decoration: none;  }
    tr.S1-Date { font-size: 125%; font-family: "Calibri"; font-weight: normal; font-style: italic; text-decoration: none;  }
    tr.S1-ColHeader { font-size: 100%; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none;  }
    tr.S1-SectHeader { font-size: 100%; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none;  }
    tr.S1-Header { font-size: 125%; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none;  }
    tr.S1-Detail { font-size: 100%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S1-UnderLine { line-height: 0%; page-break-before: avoid; page-break-after: avoid; }
    tr.S1-SectSubtotal { font-size: 100%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S1-GrandTotal { font-size: 100%; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none;  }
    tr.S1-Warning { font-size: 100%; font-family: "Calibri"; font-weight: bold; font-style: italic; text-decoration: none;  }
    tr.S1-Footnote { font-size: 100%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S1-Footer { font-size: 100%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
-->
</style>
<style type="text/css" media=print>
<!--
    tr.S2-FirmName { font-size: 11pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S2-RepTitle { font-size: 14pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S2-PortName { font-size: 12pt; font-family: "Calibri"; font-weight: bold; font-style: italic; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S2-Date { font-size: 10pt; font-family: "Calibri"; font-weight: normal; font-style: italic; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S2-ColHeader { font-size: 10pt; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S2-SectHeader { font-size: 10pt; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none; page-break-before: auto; page-break-after: avoid; }
    tr.S2-Header { font-size: 10pt; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none; page-break-before: auto; page-break-after: avoid; }
    tr.S2-Detail { font-size: 10pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: auto; page-break-after: auto; }
    tr.S2-UnderLine { line-height: 0%; page-break-before: avoid; page-break-after: avoid; }
    tr.S2-SectSubtotal { font-size: 10pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: auto; }
    tr.S2-GrandTotal { font-size: 10pt; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: auto; }
    tr.S2-Warning { font-size: 8pt; font-family: "Calibri"; font-weight: bold; font-style: italic; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S2-Footnote { font-size: 8pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S2-Footer { font-size: 8pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
-->
</style>
<style type="text/css" media=screen>
<!--
    tr.S2-FirmName { font-size: 110%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S2-RepTitle { font-size: 140%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S2-PortName { font-size: 120%; font-family: "Calibri"; font-weight: bold; font-style: italic; text-decoration: none;  }
    tr.S2-Date { font-size: 100%; font-family: "Calibri"; font-weight: normal; font-style: italic; text-decoration: none;  }
    tr.S2-ColHeader { font-size: 100%; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none;  }
    tr.S2-SectHeader { font-size: 100%; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none;  }
    tr.S2-Header { font-size: 100%; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none;  }
    tr.S2-Detail { font-size: 100%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S2-UnderLine { line-height: 0%; page-break-before: avoid; page-break-after: avoid; }
    tr.S2-SectSubtotal { font-size: 100%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S2-GrandTotal { font-size: 100%; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none;  }
    tr.S2-Warning { font-size: 80%; font-family: "Calibri"; font-weight: bold; font-style: italic; text-decoration: none;  }
    tr.S2-Footnote { font-size: 80%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S2-Footer { font-size: 80%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
-->
</style>
`;

const content2: string = `
<table width="49%" align=center cellpadding=3% cellspacing=0 class=S2>
    <colgroup>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    </colgroup>
<thead>
<tr class="S2-FirmName">
    <th align=center colspan=49>Advent Asset Management</th>
    </tr>
<tr class="S2-RepTitle">
    <th align=center colspan=49>PERFORMANCE REPORT</th>
    </tr>
<tr class="S2-RepTitle">
    <th align=center colspan=49>NET OF FEES</th>
    </tr>
<tr class="S2-PortName">
    <th align=center colspan=49><HyperLink><AppCommand Caption='Performance by Asset Class' Type='Axys Report' Cmd='rep32 -madvperf1.smc -pcase "-b093005 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee y	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Evan Case</a></th>
    </tr>
<tr class="S2-PortName">
    <th align=center colspan=49>CASE</th>
    </tr>
<tr class="S2-PortName">
    <th align=center colspan=49>Fifth Third Bank  990123475</th>
    </tr>
<tr class="S2-Date">
    <th align=center colspan=49>From 09-30-05 to 12-31-05</th>
    </tr>
<tr class="S2-Header">
    <td colspan=49>&nbsp;</td>
    </tr>
</thead>
<tbody>
<tr class="S2-SectSubtotal">
    <td align=left colspan=42>Portfolio Value on 09-30-05</td>
    <td align=right colspan=20>8,396,388</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23>Accrued Interest</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>18,778</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23><HyperLink><AppCommand Caption='Significant Contributions/Withdrawals' Type='Axys Report' Cmd='rep32 -madvperf2.smc -pcase "-b093005 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee y	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Contributions</a></td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>2,894,000</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23><HyperLink><AppCommand Caption='Significant Contributions/Withdrawals' Type='Axys Report' Cmd='rep32 -madvperf2.smc -pcase "-b093005 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee y	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Withdrawals</a></td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>0</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23><HyperLink><AppCommand Caption='Date to Date Gain and Loss' Type='Axys Report' Cmd='rep32 -madvperf3.smc -pcase "-b093005 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee y	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Realized Gains</a></td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>-42</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23><HyperLink><AppCommand Caption='Date to Date Gain and Loss' Type='Axys Report' Cmd='rep32 -madvperf3.smc -pcase "-b093005 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee y	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Unrealized Gains</a></td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>252,128</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23><HyperLink><AppCommand Caption='Income and Expenses' Type='Axys Report' Cmd='rep32 -madvperf4.smc -pcase "-b100105 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee y	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Interest</a></td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>725</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23><HyperLink><AppCommand Caption='Income and Expenses' Type='Axys Report' Cmd='rep32 -madvperf4.smc -pcase "-b100105 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee y	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Dividends</a></td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>0</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23>Change in Accrued Interest</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>8</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-UnderLine">
    <td align=left colspan=23>&nbsp;</td>
    <td align=left colspan=19><hr size=1 noshade></td>
    <td align=left colspan=19>&nbsp;</td>
    </tr>
<tr class="S2-SectSubtotal">
    <td align=left colspan=42>Portfolio Value on 12-31-05</td>
    <td align=right colspan=20>11,543,199</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23>Accrued Interest</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>18,786</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23>Average Capital</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>8,446,623</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23>Total Fees</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>0</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23>Total Gain after Fees</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>252,819</td>
    </tr>
<tr class="S2-UnderLine">
    <td align=left colspan=23>&nbsp;</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=left colspan=20><hr size=1 noshade></td>
    </tr>
<tr class="S2-GrandTotal">
    <td align=left colspan=23>IRR for 0.25 Years</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>2.99 %</td>
    </tr>
<tr class="S2-GrandTotal">
    <td align=left colspan=23>&nbsp;</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=left colspan=20><hr size=1 noshade></td>
    </tr>
</tbody>
</table>
<div>
<table width="49%" align=center cellpadding=3% cellspacing=0 class=S2>
    <colgroup>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    </colgroup>
<thead>
<tr class="S2-FirmName">
    <th align=center colspan=49>Advent Asset Management</th>
    </tr>
<tr class="S2-RepTitle">
    <th align=center colspan=49>PERFORMANCE REPORT</th>
    </tr>
<tr class="S2-RepTitle">
    <th align=center colspan=49>GROSS OF FEES</th>
    </tr>
<tr class="S2-PortName">
    <th align=center colspan=49><HyperLink><AppCommand Caption='Performance by Asset Class' Type='Axys Report' Cmd='rep32 -madvperf1.smc -pcase "-b093005 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee n	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Evan Case</a></th>
    </tr>
<tr class="S2-PortName">
    <th align=center colspan=49>CASE</th>
    </tr>
<tr class="S2-PortName">
    <th align=center colspan=49>Fifth Third Bank  990123475</th>
    </tr>
<tr class="S2-Date">
    <th align=center colspan=49>From 09-30-05 to 12-31-05</th>
    </tr>
<tr class="S2-Header">
    <td colspan=49>&nbsp;</td>
    </tr>
</thead>
<tbody>
<tr class="S2-SectSubtotal">
    <td align=left colspan=42>Portfolio Value on 09-30-05</td>
    <td align=right colspan=20>8,396,388</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23>Accrued Interest</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>18,778</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23><HyperLink><AppCommand Caption='Significant Contributions/Withdrawals' Type='Axys Report' Cmd='rep32 -madvperf2.smc -pcase "-b093005 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee n	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Contributions</a></td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>2,894,000</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23><HyperLink><AppCommand Caption='Significant Contributions/Withdrawals' Type='Axys Report' Cmd='rep32 -madvperf2.smc -pcase "-b093005 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee n	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Withdrawals</a></td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>0</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23><HyperLink><AppCommand Caption='Date to Date Gain and Loss' Type='Axys Report' Cmd='rep32 -madvperf3.smc -pcase "-b093005 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee n	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Realized Gains</a></td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>-42</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23><HyperLink><AppCommand Caption='Date to Date Gain and Loss' Type='Axys Report' Cmd='rep32 -madvperf3.smc -pcase "-b093005 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee n	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Unrealized Gains</a></td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>252,128</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23><HyperLink><AppCommand Caption='Income and Expenses' Type='Axys Report' Cmd='rep32 -madvperf4.smc -pcase "-b100105 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee n	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Interest</a></td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>725</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23><HyperLink><AppCommand Caption='Income and Expenses' Type='Axys Report' Cmd='rep32 -madvperf4.smc -pcase "-b100105 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee n	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Dividends</a></td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>0</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23>Change in Accrued Interest</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>8</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-UnderLine">
    <td align=left colspan=23>&nbsp;</td>
    <td align=left colspan=19><hr size=1 noshade></td>
    <td align=left colspan=19>&nbsp;</td>
    </tr>
<tr class="S2-SectSubtotal">
    <td align=left colspan=42>Portfolio Value on 12-31-05</td>
    <td align=right colspan=20>11,543,199</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23>Accrued Interest</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>18,786</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23>Average Capital</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>8,446,623</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23>Total Gain before Fees</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>252,819</td>
    </tr>
<tr class="S2-UnderLine">
    <td align=left colspan=23>&nbsp;</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=left colspan=20><hr size=1 noshade></td>
    </tr>
<tr class="S2-GrandTotal">
    <td align=left colspan=23>IRR for 0.25 Years</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>2.99 %</td>
    </tr>
<tr class="S2-GrandTotal">
    <td align=left colspan=23>&nbsp;</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=left colspan=20><hr size=1 noshade></td>
    </tr>
</tbody>
</table>
</div>
</body>
</html>
`;


@Component({
    selector: 'r-main',
    template: `
    <div class="reporting">
        <div class="r-titlebar">
            <div class="basic-info">
                <div>
                    <strong>Evan Case</strong>
                    <label>Portfolio</label>
                </div>
                <div>
                    <strong>09/30/2005 - 12/31/2005</strong>
                    <label>Period</label>
                </div>
            </div>   
            <div class="template-widgets">
                <p-menu #gridMenu [popup]="true" pDraggable="grids" 
                    [model]="gridMenuItems" 
                    [dragEffect]="'move'" 
                    (onDragEnd)="dragEnd($event)">
                </p-menu>
                <i id="template-grid" class="fa fa-table r-action" aria-hidden="true" title="Add Grid" (click)="gridMenu.toggle($event)"></i>
                <i id="template-chart" class="fa fa-bar-chart r-action" aria-hidden="true" title="Add Chart"></i>
                <i id="template-pic" class="fa fa-picture-o r-action" aria-hidden="true" title="Add Picture"></i>
                <i id="template-text" class="fa fa-file-text r-action" aria-hidden="true" title="Add Text"></i>
                <i id="template-text" class="fa fa-eraser r-action" aria-hidden="true" title="Clear" (click)="clearTemplate($event)"></i>
            </div>
            <div class="action-buttons">
                <span id="download" class="k-icon k-i-download r-action" title="Download" (click)="downloadJsReport()"></span>
                <span id="full-screen" class="k-icon k-i-full-screen r-action" title="Full Screen" (click)="generateJsReport(1)"></span>
                <span id="print" class="k-icon k-i-print r-action" title="Print" (click)="generateJsReport(2)"></span>
                <span id="thumbnail" class="k-icon k-i-thumbnails-left r-action" title="Thumbnail" (click)="generateJsReport(3)"></span>
                <span id="settings" class="k-icon k-i-gear r-action" (click)="generateJsReport(4)"></span>
            </div>
        </div>
        <div id="r-container" class="r-container">
            <div class="r-thumbnails">
                <p-tree [value]="files">
                    <ng-template let-node  pTemplate="default">
                        <div 
                            [style.border]="node.border" 
                            [style.margin]="node.margin" 
                            [style.height]="node.height" 
                            [style.width]="node.width" 
                            [style.backgroundColor]="node.color">{{node.label}}
                        </div>
                    </ng-template>
                </p-tree>
            </div>
            <div class="r-editors">
                <div class="paper" id="reportPlaceholder">
                    <ng-container *ngFor="let opt of options.children">
                        <r-grid *ngIf="opt.selector === 'r-grid' " [options]="opt.options">
                        </r-grid>
                    </ng-container>
                </div>
            </div>
            <div class="r-configurations">
                <div class="r-datasource">
                    <h5>Data Source</h5>
                    <div class="r-line"></div>
                    <div class="r-classifications">
                        <div class="r-titles">     
                            <strong>Classifications</strong>
                            <span id="add" class="k-icon k-i-plus r-add" title="Add Classification" 
                                (click)="onTextboxAdd($event, 'classification')">
                            </span>
                        </div>
                        <div class="r-content" 
                            [dragula]="'classification'"
                            [dragulaModel]="tOptions.classic.children">
                            <ng-container *ngFor="let opt of tOptions.classic.children">
                                <r-textbox *ngIf="opt.selector === 'r-textbox' " 
                                    [options]="opt.options" 
                                    (remove)="onTextboxRemove($event)"
                                    (edit)="onTextboxEdit($event)">
                                </r-textbox>
                            </ng-container>
                        </div>
                    </div>
                    <div class="r-line"></div>
                    <div class="r-columns">
                        <div class="r-titles">
                            <span id="add" class="k-icon k-i-plus r-add" title="Add Column" 
                                (click)="onTextboxAdd($event, 'column')">
                            </span>
                            <strong>Columns</strong>
                            <div id="group" class="fa fa-object-group r-group" title="Group" 
                                (click)="onTextboxGroup($event)">
                            </div>
                        </div>
                        <div class="r-content">
                            <ul class="outer" [dragula]="'column'" 
                                [dragulaModel]="tOptions.column.children">
                                <li *ngFor="let opt of tOptions.column.children">
                                    <r-textbox  *ngIf="opt.selector === 'r-textbox' "
                                        [id]="opt.options.id"  
                                        [options]="opt.options"
                                        (select)="onTextboxSelect($event)" 
                                        (edit)="onTextboxEdit($event)"
                                        (remove)="onTextboxRemove($event)">
                                    </r-textbox>
                                    <ul class="inner" [dragula]="'subtextbox'" 
                                        [dragulaModel]="opt.options.children">
                                        <li *ngFor="let sopt of opt.options.children">
                                            <r-textbox  *ngIf="sopt.selector === 'r-textbox' "
                                                [id]="sopt.options.id"  
                                                [options]="sopt.options"
                                                (select)="onTextboxSelect($event)" 
                                                (edit)="onTextboxEdit($event)"
                                                (remove)="onTextboxRemove($event)">
                                            </r-textbox>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="r-line"></div>
                    <div class="r-conditions">
                        <div class="r-titles">
                            <strong>Conditions</strong>
                            <span id="add" class="k-icon k-i-plus r-add" title="Add Condition"></span>
                        </div>
                        <div class="r-content">
                            <ng-container *ngFor="let opt of options.children">
                                <r-textbox *ngIf="opt.selector === 'r-textbox' " 
                                    [options]="opt.options" (remove)="onRemove($event)">
                                </r-textbox>
                            </ng-container>
                        </div>
                    </div>
                </div>
                <p-overlayPanel #overlay
                    [dismissable]="true"
                    [showCloseIcon]="true"
                    (onAfterHide)="onAfterHide($event)">
                    <div class="r-overlay">
                        <div class="r-overlay-titlebar">
                            <span>{{overlayOptions.title}}</span>
                        </div>
                        <div class="r-overlay-content">
                            <p-listbox *ngIf="overlayOptions.secondary.children.length === 0"
                                [options]="overlayOptions.items"
                                [(ngModel)]="selectedListItem"
                                (onChange)="onListChange($event)">
                            </p-listbox>
                            <div class="r-secondary-page" *ngIf="overlayOptions.secondary.children.length">
                                <div class="r-widgets">    
                                    <ng-container *ngFor="let opt of overlayOptions.secondary.children">
                                        <r-datepicker *ngIf="opt.selector === 'r-datepicker'"
                                            [options]="opt.options">
                                        </r-datepicker>
                                        <r-dropdown *ngIf="opt.selector === 'r-dropdown'"
                                            [options]="opt.options">
                                        </r-dropdown>
                                        <r-radiogroup *ngIf="opt.selector === 'r-radiogroup'"
                                            [options]="opt.options">
                                        </r-radiogroup>
                                        <r-textinput *ngIf="opt.selector === 'r-textinput'"
                                            [options]="opt.options">
                                        </r-textinput>
                                    </ng-container>
                                </div>
                                <div class="r-buttons">
                                    <button *ngIf="overlayOptions.secondary.hasBack" type="button" class="btn btn-info r-button r-button-margin" (click)="onBackToList()">Back</button>
                                    <button type="button" class="btn btn-primary r-button" (click)="onSave()">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </p-overlayPanel>
            </div>    
        </div>
    </div>
    `,
    styleUrls: ['./reporting.component.scss']
})

export class ReportingComponent implements OnInit {

    @ViewChild("gridMenu") gridMenu: Menu;
    @ViewChild("overlay") overlay: OverlayPanel;

    files: any[] = [
        {
            "label": "Portfolio Appraisal",
            "data": "Portfolio Appraisal",
            "width": "100%",
            "border": "",
            "expandedIcon": "fa-folder-open",
            "collapsedIcon": "fa-folder",
            "children": [
                {
                    "label": "",
                    "data": "",
                    "border": "2px solid lightgray",
                    "margin": "5px 0px 5px -15px",
                    "height": "140px",
                    "width": "180px",
                    "color": "white"
                },
                {
                    "label": "",
                    "data": "",
                    "margin": "5px 0px 5px -15px",
                    "border": "2px solid lightgray",
                    "height": "140px",
                    "width": "180px",
                    "color": "#FFF0F5"
                }
            ]
        },
        {
            "label": "Performance Overview",
            "data": "Performance Overview",
            "width": "100%",
            "border": "",
            "expandedIcon": "fa-folder-open",
            "collapsedIcon": "fa-folder",
            "children": [
                {
                    "label": "",
                    "data": "",
                    "margin": "5px 0px 5px -15px",
                    "border": "2px solid lightgray",
                    "height": "200px",
                    "width": "180px",
                    "color": "#FFFFF0"
                },
                {
                    "label": "",
                    "data": "",
                    "margin": "5px 0px 5px -15px",
                    "border": "2px solid lightgray",
                    "height": "200px",
                    "width": "180px",
                    "color": "white"
                }
            ]
        }
    ];

    gridMenuItems: MenuItem[] = [];
    gridItemCmdCallback: any = null;

    options: any = {
        children: []
    };

    tOptions: any = {
        classic: {
            children: []
        },
        column: {
            children: []
        }
    }

    overlayOptions: any = {
        title: "",
        tempTitle: "",
        column: "",
        classification: "",
        items: [],
        secondary: {
            children: []
        }
    };

    columns: IGridColumn[] = [];
    columnItems: IGridColumn[] = [];
    classis: any[] = [];
    summaries: IGridColumnSummary[] = [];
    groupSummaries: IGridColumnSummary[] = [];
    gridData: any[] = [];
    pristineData: any[] = [];
    dsClassifications: RTextbox[] = [];
    dsColumns: RTextbox[] = [];
    classiMenus: any[] = [];

    selectedListItem: string;
    formGroup: FormGroup;
    mvDate: string = "12/31/2015";
    mvCurrency: string = "USD";
    order: string = "Ascending";
    nodes: any[] = [];
    mode: string = "";
    groupItems: string[] = [];

    constructor(
        private render: Renderer,
        private render2: Renderer2,
        private eleRef: ElementRef,
        private dragulaService: DragulaService) { }

    ngOnInit() {
        this.render2.setStyle(
            this.eleRef.nativeElement.querySelector("#r-container"), "height", `${window.innerHeight - 60}px`);

        this.gridItemCmdCallback = this.addGrid.bind(this);
        this.gridMenuItems = [
            { label: 'Asset Table1', icon: 'k-icon k-i-table', command: this.gridItemCmdCallback },
            { label: 'Asset Table2', icon: 'k-icon k-i-table-properties', command: this.gridItemCmdCallback },
            { label: 'Asset Table3', icon: 'k-icon k-i-table-cell', command: this.gridItemCmdCallback },
            { label: 'Asset Table4', icon: 'k-icon k-i-table-cell-properties', command: this.gridItemCmdCallback }
        ];
        this.parseData();

        this.dragulaService.drop.subscribe((value: Array<any>) => {
            if (value[0] === "column") {
                this.resortColumn();
            }
            else if (value[0] === "classification") {
                this.reorderClassification();
            }
        });

        JsReport.serverUrl = 'https://shanelovesmarvel.jsreportonline.net';
        JsReport.headers.Authorization = "d295dXNoYW5taW5nQHNpbmEuY29tOjQwMzEwMzY2M3poYW8=";
    }

    downloadJsReport(type: number = 1, animation: boolean = false): void {
        let request = {
            template: {
                content: `${content1}${this.getChartString(type, animation)}${content2}`,
                //engine: 'none', recipe: 'html-with-browser-client'
                engine: 'none', recipe: 'phantom-pdf'
            }
        };
        JsReport.download("perfomance.pdf", request);
    }

    generateJsReport(type: number = 1, animation: boolean = true): void {
        console.info(JsReport);
        document.getElementById("reportPlaceholder").innerHTML = "";
        let request = {
            template: {
                content: `${content1}${this.getChartString(type, animation)}${content2}`,
                engine: 'none', recipe: 'html-with-browser-client'
                //engine: 'none', recipe: 'phantom-pdf'
            }
        };

        //display report in the new tab
        //JsReport.render('_self', request);

        //display report in placeholder with id reportPlaceholder
        //JsReport.render('reportPlaceholder', request);

        //display report in placeholder element
        JsReport.render(document.getElementById('reportPlaceholder'), request);

        //open download dialog for report
        //JsReport.download('myReport.pdf', request);
    }

    getChartString(chartType: ChartType = ChartType.HighCharts, animation: boolean): string {
        let baseScript: string = `
            <script src="https://code.highcharts.com/highcharts.src.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
            <script src="https://cdn.bootcss.com/echarts/3.8.5/echarts.min.js"></script>
            <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.18/c3.min.js"></script>
            </head>
            <body>
        `;
        let chartString: string = "";
        if (chartType === ChartType.HighCharts) {
            chartString = `
            <div>
                <div id="chart.0" style="height: 400px; max-width: 800px; margin: 0 auto"></div>
                <div id="chart.1" style="height: 400px; max-width: 800px; margin: 0 auto"></div>
                <div id="chart.2" style="height: 400px; max-width: 800px; margin: 0 auto"></div>
                <div id="chart.3" style="height: 400px; max-width: 800px; margin: 0 auto"></div>
                <img src="http://img3.iqilu.com/data/attachment/forum/201403/20/063249zta7zntigk7itk2t.jpg" style="margin: 0 auto;">
            </div>
            <script>
                Highcharts.chart('chart.0', {
                    title: {
                        text: "HighCharts - Pie"
                    },
                    chart: {
                        type: 'pie'
                    },
                    series: [
                        {
                            animation: ${animation},
                            data: [
                                {
                                    name: 'Equity',
                                    color: 'blue',
                                    y: 9911045
                                },
                                {
                                    name: 'Fixed Income',
                                    color: 'yellow',
                                    y: 6447356
                                },
                                {
                                    name: 'Cash',
                                    color: 'red',
                                    y: 1586467
                                }
                            ]
                        }
                    ]
                });

                Highcharts.chart('chart.1', {
                    title: {
                        text: "HighCharts - HorizontalBar"
                    },
                    chart: {
                        type: 'bar',
                    },
                    series: [
                        {
                            animation: ${animation},
                            data: [
                                {
                                    name: 'Equity',
                                    color: 'blue',
                                    y: 9911045
                                }, 
                                {
                                    name: 'Fixed Income',
                                    color: 'yellow',
                                    y: 6447356
                                }, 
                                {
                                    name: 'Cash',
                                    color: 'red',
                                    y: 1586467
                                }
                            ]
                        }
                    ]
                });

                Highcharts.chart('chart.2', {
                    title: {
                        text: "HighCharts - Bar"
                    },
                    chart: {
                        type: 'column',
                    },
                    series: [
                        {
                            animation: ${animation},
                            data: [
                                {
                                    name: 'Equity',
                                    color: 'blue',
                                    y: 9911045
                                }, 
                                {
                                    name: 'Fixed Income',
                                    color: 'yellow',
                                    y: 6447356
                                }, 
                                {
                                    name: 'Cash',
                                    color: 'red',
                                    y: 1586467
                                }
                            ]
                        }
                    ]
                });

                Highcharts.chart('chart.3', {
                    title: {
                        text: "HighCharts - Line"
                    },
                    chart: {
                        type: 'line',
                    },
                    series: [
                        {
                            animation: ${animation},
                            data: [
                                {
                                    name: 'Equity',
                                    color: 'blue',
                                    y: 9911045
                                }, 
                                {
                                    name: 'Fixed Income',
                                    color: 'yellow',
                                    y: 6447356
                                }, 
                                {
                                    name: 'Cash',
                                    color: 'red',
                                    y: 1586467
                                }
                            ]
                        }
                    ]
                });

                // var imgs = document.getElementsByTagName("img");
                // console.info(imgs[0]);
                // var canvas = document.createElement("canvas");
                // canvas.width = imgs[0].width;
                // canvas.height = imgs[0].height;
                // var ctx = canvas.getContext("2d");
                // ctx.drawImage(imgs[0], 0, 0);
                // var dataURL = canvas.toDataURL("assets/timg.jpg");
                // console.warn(dataURL);
            </script>
            `;
        }
        else if (chartType === ChartType.ChartJS) {
            chartString = `
                <canvas id="chart.4" style="height: 400px; max-width: 800px; margin: 10px auto" width="600" height="400"></canvas>
                <canvas id="chart.5" style="height: 400px; max-width: 800px; margin: 10px auto" width="600" height="400"></canvas>
                <canvas id="chart.6" style="height: 400px; max-width: 800px; margin: 10px auto" width="600" height="400"></canvas>
                <canvas id="chart.7" style="height: 400px; max-width: 800px; margin: 10px auto" width="600" height="400"></canvas>
                <script>
                    var ctx1 = document.getElementById("chart.4").getContext('2d');
                    var barChart = new Chart(ctx1, {
                        type: 'bar',
                        data: {
                            labels: ["Fixed Income", "Equity", "Cash"],
                            datasets: [{
                                label: '#ChartJS - Bar',
                                data: [12, 19, 3],
                                backgroundColor: ['yellow', 'blue', 'red'],
                                borderColor: ['yellow', 'blue', 'red'],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero:true
                                    }
                                }]
                            },
                            animation: {
                                duration: ${animation ? 1000 : 0}
                            }
                        }
                    });
            
                    var ctx2 = document.getElementById("chart.5").getContext('2d');
                    var pieChart = new Chart(ctx2, {
                        type: 'pie',
                        data: {
                            labels: ["Fixed Income", "Equity", "Cash"],
                            datasets: [{
                                label: '#ChartJS - Pie',
                                data: [12, 19, 3],
                                backgroundColor: ['yellow', 'blue', 'red'],
                                borderColor: ['yellow', 'blue', 'red'],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            animation: {
                                duration: ${animation ? 1000 : 0}
                            }
                        }
                    });
            
                    var ctx3 = document.getElementById("chart.6").getContext('2d');
                    var lineChart = new Chart(ctx3, {
                        type: 'line',
                        data: {
                            labels: ["Fixed Income", "Equity", "Cash"],
                            datasets: [{
                                label: '#ChartJS - Line',
                                data: [12, 19, 3]
                            }]
                        },
                        options: {
                            animation: {
                                duration: ${animation ? 1000 : 0}
                            }
                        }
                    });
            
                    var ctx4 = document.getElementById("chart.7").getContext('2d');
                    var hBarChart = new Chart(ctx4, {
                        type: 'horizontalBar',
                        data: {
                            labels: ["Fixed Income", "Equity", "Cash"],
                            datasets: [{
                                label: 'ChartJS - Horizontal Bar',
                                data: [12, 19, 3],
                                backgroundColor: ['yellow', 'blue', 'red'],
                                borderColor: ['yellow', 'blue', 'red'],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero:true
                                    }
                                }]
                            },
                            animation: {
                                duration: ${animation ? 1000 : 0}
                            }
                        }
                    });
                </script>
            `;
        }
        else if (chartType === ChartType.ECharts) {
            chartString = `
                <div id="chart.8" style="height: 400px; max-width: 800px; margin: 0 auto"></div>
                <div id="chart.9" style="height: 400px; max-width: 800px; margin: 0 auto"></div>
                <div id="chart.10" style="height: 400px; max-width: 800px; margin: 0 auto"></div>
                <div id="chart.11" style="height: 400px; max-width: 800px; margin: 0 auto"></div>
                <script>
                    var ctx5 = echarts.init(document.getElementById('chart.8'));
                    ctx5.setOption({
                        title: {
                            text: 'ECharts - Bar'
                        },
                        animation: ${animation},
                        tooltip: {},
                        legend: {
                            data:['2015', '2016', '2017']
                        },
                        xAxis: {
                            data: ['Fixed Income', 'Equity', 'Cash']
                        },
                        yAxis: {},
                        series: [
                            {
                                name: "2015",
                                type: 'bar',
                                data: [12, 19, 3]
                            },
                            {
                                name: "2016",
                                type: 'bar',
                                data: [18, 12, 20]
                            },
                            {
                                name: "2017",
                                type: 'bar',
                                data: [6, 23, 16]
                            }
                        ]
                    });
            
                    var ctx6 = echarts.init(document.getElementById('chart.9'));
                    ctx6.setOption({
                        title: {
                            text: 'ECharts - HorizontalBar'
                        },
                        animation: ${animation},
                        colors: ['yellow', 'blue', 'red'],
                        tooltip: {},
                        legend: {
                            data:['2015', '2016', '2017']
                        },
                        xAxis: {
                            
                        },
                        yAxis: {
                            data: ['Fixed Income', 'Equity', 'Cash']
                        },
                        series: [
                            {
                                name: "2015",
                                type: 'bar',
                                data: [12, 19, 3]
                            },
                            {
                                name: "2016",
                                type: 'bar',
                                data: [18, 12, 20]
                            },
                            {
                                name: "2017",
                                type: 'bar',
                                data: [6, 23, 16]
                            }
                        ]
                    });
            
                    var ctx7 = echarts.init(document.getElementById('chart.10'));
                    ctx7.setOption({
                        title: {
                            text: 'ECharts - Pie'
                        },
                        animation: ${animation},
                        tooltip: {},
                        legend: {
                            data:['Fixed Income', 'Equity', 'Cash']
                        },
                        series: [{
                            type: 'pie',
                            radius : '65%',
                            center: ['50%', '50%'],
                            data: [
                                {
                                    name: "Fixed Income",
                                    value: 12
                                },
                                {
                                    name: "Equity",
                                    value: 19
                                },
                                {
                                    name: "Cash",
                                    value: 3
                                }
                            ]
                        }]
                    });
            
                    var ctx8 = echarts.init(document.getElementById('chart.11'));
                    ctx8.setOption({
                        title: {
                            text: 'ECharts - Line'
                        },
                        animation: ${animation},
                        tooltip: {},
                        legend: {
                            data:['Fixed Income', 'Equity', 'Cash']
                        },
                        xAxis: {
                            data: ['Fixed Income', 'Equity', 'Cash']
                        },
                        yAxis: {
                            
                        },
                        series: [
                            {
                                type: 'line',
                                data: [12, 19, 3]
                            }
                        ]
                    });
                </script>
            `;
        }
        else if (chartType === ChartType.PlotyJS) {
            chartString = `
                <div id="chart.12" style="height: 400px; max-width: 800px; margin: 0 auto"></div>
                <div id="chart.13" style="height: 400px; max-width: 800px; margin: 0 auto"></div>
                <div id="chart.14" style="height: 400px; max-width: 800px; margin: 0 auto"></div>
                <div id="chart.15" style="height: 400px; max-width: 800px; margin: 0 auto"></div>
                <script>
                    Plotly.plot("chart.12", [
                        {
                            x: ['Fixed Income', 'Equity', 'Cash'],
                            y: [12, 19, 3],
                            type: "bar"
                        }
                    ]);
                
                    Plotly.plot("chart.13", [
                        {
                            y: ['Fixed Income', 'Equity', 'Cash'],
                            x: [12, 19, 3],
                            type: "bar",
                            orientation: 'h'
                        }
                    ]);
                
                    Plotly.plot("chart.14",  [
                        {
                            labels: ['Fixed Income', 'Equity', 'Cash'],
                            values: [12, 19, 3],
                            type: "pie"
                        }
                    ]);
                
                    Plotly.plot("chart.15",  [
                        {
                            x: ['Fixed Income', 'Equity', 'Cash'],
                            y: [12, 19, 3],
                            type: "scatter"
                        },
                        {
                            x: ['Fixed Income', 'Equity', 'Cash'],
                            y: [20, 7, 17],
                            type: "scatter"
                        }
                    ]);
                </script>
            `;
        }
        return `${baseScript}${chartString}`;
    }

    resortColumn() {
        let orders: Array<any> = this.tOptions.column.children.map((item: any) => {
            return item.options.name;
        });
        this.columns.sort((a: IGridColumn, b: IGridColumn): number => {
            return orders.indexOf(a.dataField) - orders.indexOf(b.dataField);
        });
        this.options.children[0].options.columns = this.columns;
    }

    onBackToList() {
        if (this.overlayOptions.items.length === 0) {
            if (this.overlayOptions.type === DataSourceTypes.Classification) {
                this.addClassficationItems();
            }
            else if (this.overlayOptions.type === DataSourceTypes.Column) {
                this.addColumnItems();
            }
            this.overlayOptions.items = this.classiMenus;
        }
        this.overlayOptions.title = this.overlayOptions.tempTitle;
        this.overlayOptions.secondary.children = [];
        this.overlayOptions.column = "";
        this.overlayOptions.classification = "";
        this.selectedListItem = null;
    }

    onListChange(obj) {
        if (!obj || !obj.value) {
            return;
        }
        if (this.overlayOptions.type === DataSourceTypes.Classification) {
            this.setClassficationDetails(obj.value);
        }
        else if (this.overlayOptions.type === DataSourceTypes.Column) {
            this.setColumnDetails(obj.value);
        }
    }

    onSave() {
        if (this.overlayOptions.type === DataSourceTypes.Classification) {

            let { Order } = this.formGroup.getRawValue();
            this.order = Order;
            this.addClassification(this.overlayOptions.classification, this.mode, Order);

            this.options.children[0].options.data = this.gridData;
            this.options.children[0].options.columns = this.columns;
            this.options.children[0].options.summaries = this.summaries;
            this.options.children[0].options.groupSummaries = this.groupSummaries;
            this.tOptions.classic.children = this.dsClassifications;
        }
        else if (this.overlayOptions.type === DataSourceTypes.Column) {
            if (this.mode === ActionModes.Add) {
                let { AsDate, Currency } = this.formGroup.getRawValue();
                let newValue: string = `Market Value(${AsDate})`;
                let columnx: IGridColumn = this.columns.find((column: IGridColumn) => column.dataField === newValue);
                if (columnx) {
                    this.columns.map((column: IGridColumn) => {
                        if (column.dataField === newValue) {
                            column.visible = true;
                        }
                    });
                } else {
                    let column: IGridColumn = {};
                    column.dataField = newValue;
                    column.caption = newValue;
                    column.visible = true;
                    column.allowShowInMenu = false;
                    this.initNumberColumn(column, newValue);
                    this.columns.push(column);

                    this.gridData.forEach((item: any) => {
                        item[newValue] = item[this.overlayOptions.column] * 0.8;
                    });

                    appraisalData.forEach((item: any) => {
                        item[newValue] = item[this.overlayOptions.column] * 0.8;
                    });

                    this.dsColumns.push({
                        selector: "r-textbox",
                        options: {
                            name: newValue,
                            value: newValue,
                            id: newValue,
                            type: "column",
                            className: "tb",
                            editClassName: "tb-edit",
                            level: "top"
                        }
                    });
                }

                this.options.children[0].options.data = this.gridData;
                this.options.children[0].options.summaries = this.summaries;
                this.options.children[0].options.groupSummaries = this.groupSummaries;

                this.mvDate = AsDate;
                this.mvCurrency = Currency;

            }

            else if (this.mode === ActionModes.Edit) {
                if (this.overlayOptions.grouped) {
                    let GroupName = this.formGroup.getRawValue()[this.overlayOptions.column];
                    this.columns.map((column: IGridColumn) => {
                        if (column.dataField === this.overlayOptions.column) {
                            column.visible = true;
                            column.caption = GroupName;
                        }
                    });

                    this.dsColumns.forEach((item: any) => {
                        if (item.options.name === this.overlayOptions.column) {
                            item.options.value = GroupName;
                        }
                    });

                } else {
                    let { AsDate, Currency } = this.formGroup.getRawValue();
                    let newValue: string = `Market Value(${AsDate})`;
                    let newCaption: string = newValue;
                    this.columns.map((column: IGridColumn) => {
                        if (column.dataField === this.overlayOptions.column) {
                            column.visible = true;
                            column.caption = newCaption;
                        }
                    });

                    this.dsColumns.forEach((item: any) => {
                        if (item.options.name === this.overlayOptions.column) {
                            item.options.value = newValue;
                        }
                    });

                    this.mvDate = AsDate;
                    this.mvCurrency = Currency;
                }
            }

            else if (this.mode === ActionModes.Group) {
                let { GroupName } = this.formGroup.getRawValue();
                let subColumns: IGridColumn[] = [];
                let subTextboxes: any[] = [];
                let indexes: number[] = [];
                let hasGroup: string = "";

                for (let i: number = 0; i < this.groupItems.length; i++) {
                    let columnName: string = this.groupItems[i];
                    let textbox: any = this.dsColumns.find((textbox: any) => textbox.options.name === columnName);
                    if (hasGroup === "" && textbox.options.children && textbox.options.children.length) {
                        hasGroup = columnName;
                        continue;
                    }
                    let column: IGridColumn = this.columns.find((col: IGridColumn) => col.dataField === columnName);
                    if (column) {
                        if (column.subColumns && column.subColumns.length) {
                            subColumns.push(...column.subColumns);
                        } else {
                            subColumns.push(column);
                        }
                        let index: number = this.columns.indexOf(column);
                        this.columns.splice(index, 1);
                    }

                    if (textbox) {
                        if (textbox.options.children && textbox.options.children.length) {
                            subTextboxes.push(...textbox.options.children);
                        } else {
                            subTextboxes.push(textbox);
                        }
                        let index: number = this.dsColumns.indexOf(textbox);
                        indexes.push(index);
                        this.dsColumns.splice(index, 1);
                    }
                }

                subTextboxes.forEach((item: any) => {
                    item.options.className = "sub_tb";
                    item.options.editClassName = "sub_tb-edit";
                    item.options.level = "sub";
                    item.options.parent = `g${GroupName}`;
                });


                if (hasGroup !== "") {
                    this.columns.map((column: IGridColumn) => {
                        if (column.dataField === hasGroup) {
                            column.subColumns.push(...subColumns);
                            column.caption = GroupName;
                            column.dataField = `g${GroupName}`;
                        }
                    });
                    this.dsColumns.map((item: any) => {
                        if (item.options.name === hasGroup) {
                            item.options.children.push(...subTextboxes);
                            item.options.value = GroupName;
                            item.options.name = `g${GroupName}`;
                            item.options.grouped = true;
                        }
                    });

                } else {
                    let column: IGridColumn = {
                        caption: GroupName,
                        dataField: `g${GroupName}`,
                        allowShowInMenu: false,
                        visible: true,
                        alignment: "center",
                        subColumns
                    };
                    this.columns.push(column);

                    let textbox: any = {
                        selector: "r-textbox",
                        options: {
                            name: `g${GroupName}`,
                            value: GroupName,
                            id: GroupName,
                            type: "column",
                            className: "tb",
                            editClassName: "tb-edit",
                            children: subTextboxes,
                            level: "top",
                            grouped: true
                        }
                    };
                    this.dsColumns.splice(Math.min(...indexes), 0, textbox);
                }

                this.options.children[0].options.summaries = this.summaries;
                this.options.children[0].options.groupSummaries = this.groupSummaries;
            }
            this.options.children[0].options.columns = this.columns;
            this.tOptions.column.children = this.dsColumns;
            this.groupItems = [];

        }
        this.overlay.hide();
    }

    onTextboxAdd(event: MouseEvent, type: string) {
        this.classiMenus = [];
        this.mode = ActionModes.Add;

        if (type === DataSourceTypes.Classification) {
            this.addClassficationItems();
            this.overlayOptions = {
                title: "Add Classification",
                tempTitle: "Add Classification",
                items: this.classiMenus,
                type: type,
                secondary: {
                    children: []
                }
            };
        }

        else if (type === DataSourceTypes.Column) {
            this.addColumnItems();
            this.overlayOptions = {
                title: "Add Column",
                tempTitle: "Add Column",
                items: this.classiMenus,
                type: type,
                secondary: {
                    children: []
                }
            };
        }

        else if (type === DataSourceTypes.Configuration) {

        }
        this.render2.setStyle(this.eleRef.nativeElement.querySelector(".ui-overlaypanel"), "marginLeft", "-20em");
        this.overlay.toggle(event);
    }

    onTextboxEdit(options: ITextBox, level?: string) {
        this.classiMenus = [];
        this.mode = ActionModes.Edit;

        if (options.type === DataSourceTypes.Classification) {
            this.overlayOptions.orginalName = options.name;
            this.setClassficationDetails(options.name);
        }
        else if (options.type === DataSourceTypes.Column) {
            if (options.grouped) {
                this.setGroupDetais(options.value, options.name);
            } else {
                this.setColumnDetails(options.name);
            }
        }
        else if (options.type === DataSourceTypes.Configuration) {

        }

        this.render2.setStyle(this.eleRef.nativeElement.querySelector(".ui-overlaypanel"), "marginLeft", "-18.2em");
        this.overlay.toggle(event);
    }

    onTextboxGroup(event) {
        if (this.groupItems.length < 2) {
            return;
        }
        this.classiMenus = [];
        this.mode = ActionModes.Group;
        this.setGroupDetais();
        this.render2.setStyle(this.eleRef.nativeElement.querySelector(".ui-overlaypanel"), "marginLeft", "-18.2em");
        this.overlay.toggle(event);
    }

    onTextboxRemove(options: ITextBox) {
        this.mode = ActionModes.Remove;
        if (options.type === DataSourceTypes.Classification) {
            this.removeClassification(options.name);

            this.options.children[0].options.data = this.gridData;
            this.options.children[0].options.columns = this.columns;
            this.options.children[0].options.summaries = this.summaries;
            this.options.children[0].options.groupSummaries = [];
            this.tOptions.classic.children = this.dsClassifications;
        }
        else if (options.type === DataSourceTypes.Column) {
            if (options.level === "top") {
                this.columns.map((column: IGridColumn) => {
                    if (column.dataField === options.name) {
                        column.visible = false;
                    }
                });
                this.dsColumns = this.dsColumns.filter((widget: any) => widget.options.name !== options.name);

            } else if (options.level === "sub") {
                let allHide: boolean = false;
                let tempTextbox: any = null;

                this.columns.map((column: IGridColumn) => {
                    if (column.dataField === options.parent) {
                        if (column.subColumns.length > 1) {
                            column.subColumns.map((columnx: IGridColumn) => {
                                if (columnx.dataField === options.name) {
                                    columnx.visible = false;
                                }
                            });
                            allHide = column.subColumns.every((columny: IGridColumn): boolean => {
                                return columny.visible === false;
                            });
                        }
                    }
                });

                if (allHide) {
                    let groupIndex: number = this.columns.findIndex((col: IGridColumn) => col.dataField === options.parent);
                    this.columns.splice(groupIndex, 1);
                }

                this.dsColumns.map((item: any) => {
                    if (item.options.name === options.parent) {
                        if (item.options.children.length > 1) {
                            let index: number = item.options.children.findIndex((item: any) => item.options.name === options.name);
                            item.options.children.splice(index, 1);
                        } else if (item.options.children.length === 1) {
                            tempTextbox = item.options.children[0];
                        }
                    }
                });

                if (tempTextbox) {
                    let textIndex: number = this.dsColumns.findIndex((item: any) => item.options.name === options.parent);
                    this.dsColumns.splice(textIndex, 1);
                }
            }
            this.options.children[0].options.columns = this.columns;
            this.tOptions.column.children = this.dsColumns;
        }
    }

    onTextboxSelect(options: ITextBox, level?: string) {
        if (options.selected) {
            this.groupItems.push(options.name);
        } else {
            let index: number = this.groupItems.findIndex((item: string) => item === options.name);
            this.groupItems.splice(index, 1);
        }
    }

    setColumnDetails(columnName: string) {
        this.overlayOptions.type = "column";
        this.overlayOptions.tempTitle = "Select Column";
        this.overlayOptions.column = columnName;
        if (columnName.includes("Market Value")) {
            this.formGroup = new FormGroup({});
            this.overlayOptions.title = `Edit ${columnName}`;
            this.overlayOptions.secondary = {
                hasBack: true,
                children: [
                    {
                        selector: "r-datepicker",
                        options: {
                            value: this.mvDate,
                            name: "AsDate",
                            caption: "As Of Date",
                            ddOptions: {
                                dataSource: genericdates,
                                displayExpr: "label",
                                valueExpr: "value",
                                value: "09/06/2017"
                            },
                            form: this.formGroup
                        }
                    },
                    {
                        selector: "r-dropdown",
                        options: {
                            dataSource: currencies,
                            valueExpr: "value",
                            value: this.mvCurrency,
                            caption: "Currency",
                            name: "Currency",
                            form: this.formGroup
                        }
                    }
                ]
            }
        }
        else {
            let isExisted: RTextbox = this.dsColumns.find((tx: RTextbox) => tx.options.name === columnName);
            if (isExisted) {
                return;
            }
            this.columns.map((column: IGridColumn) => {
                if (column.dataField === columnName) {
                    column.visible = true;
                }
            });
            this.dsColumns.push({
                selector: "r-textbox",
                options: {
                    name: columnName,
                    value: columnName,
                    id: columnName,
                    type: DataSourceTypes.Column,
                    className: TEXTBOX_CLASSNAME,
                    editClassName: TEXTBOX_EDIT_CLASSNAME,
                    level: "top"
                }
            });
            this.overlay.hide();
        }
    }

    setClassficationDetails(classificationName: string) {
        this.overlayOptions.type = "classification";
        this.overlayOptions.tempTitle = "Select Classfication";
        this.overlayOptions.classification = classificationName;
        this.formGroup = new FormGroup({});
        this.overlayOptions.title = `Edit ${classificationName}`;
        this.overlayOptions.secondary = {
            hasBack: true,
            children: [
                {
                    selector: "r-radiogroup",
                    options: {
                        value: this.order,
                        name: "Order",
                        caption: "Order",
                        dataSource: ["Ascending", "Dscending"],
                        form: this.formGroup
                    }
                }
            ]
        }
    }

    setGroupDetais(value: string = "Group", name: string = "GroupName"): void {
        this.overlayOptions.type = "column";
        this.overlayOptions.column = name;
        this.overlayOptions.grouped = true;
        this.formGroup = new FormGroup({});
        this.overlayOptions.title = "Edit Column Group";
        this.overlayOptions.secondary = {
            hasBack: false,
            children: [
                {
                    selector: "r-textinput",
                    options: {
                        value,
                        name,
                        caption: "Column Group Name",
                        form: this.formGroup
                    }
                }
            ]
        };
    }

    addColumnItems() {
        this.columnItems.map((column: IGridColumn) => {
            if (column.allowShowInMenu) {
                let cl: any = {
                    label: column.dataField,
                    value: column.dataField,
                    id: column.dataField,
                    type: "column"
                };
                this.classiMenus.push(cl);
            }
        });
    }

    addClassficationItems() {
        this.classis.forEach((cl: any) => {
            cl.type = "classification";
            cl.value = cl.label;
            this.classiMenus.push(cl);
        });
    }

    parseData(): void {
        this.pristineData.push(...appraisalData);
        for (let i: number = 0; i < appraisalData.length; i++) {
            Object.keys(appraisalData[i]).forEach((key: string) => {
                if (appraisalData[i][key] === "NULL") {
                    appraisalData[i][key] = "";
                }
                else if (!isNaN(appraisalData[i][key])) {
                    appraisalData[i][key] = +appraisalData[i][key];
                }
            })
        }
    }

    initNumberColumn(column: IGridColumn, key: string) {
        column.dataType = "number";
        column.format = parseNumber;

        let columnSummary: IGridColumnSummary = {};
        columnSummary.column = key;
        columnSummary.summaryType = "sum";
        columnSummary.alignByColumn = true;
        columnSummary.customizeText = customizeSummaryResult;
        this.summaries.push(columnSummary);

        let groupSummary: IGridColumnSummary = {};
        groupSummary.column = key;
        groupSummary.summaryType = "sum";
        groupSummary.customizeText = customizeSummaryResult;
        groupSummary.alignByColumn = true;
        groupSummary.showInGroupFooter = true;
        this.groupSummaries.push(groupSummary);
    }

    initColumns() {
        let appraisal: any = appraisalData[2];
        Object.keys(appraisal).forEach((key: string) => {
            let column: IGridColumn = {};
            column.dataField = key;
            column.caption = key;
            if (typeof appraisal[key] === "number") {
                this.initNumberColumn(column, key);
            } else if (typeof appraisal[key] === "string") {
                column.dataType = "string";
            }
            if (key === "Quantity" || key === "Unit Cost" || key === "Price") {
                column.visible = false;
            } else {
                column.visible = true;
            }

            if (key === Classifications.AssetClass || key === Classifications.SecurityType || key === Classifications.Security) {
                column.allowShowInMenu = false;
                column.isClassification = true;
            } else {
                column.allowShowInMenu = true;
                column.isClassification = false;
            }
            column.allowSort = false;
            this.columns.push(column);
        });

        let summary: IGridColumnSummary = {};
        summary.customizeText = customizeSummaryText;
        summary.column = Classifications.AssetClass;
        this.summaries.push(summary);

        let groupSummary: IGridColumnSummary = {};
        groupSummary.customizeText = customizeGroupText;
        groupSummary.column = Classifications.AssetClass;
        groupSummary.showInGroupFooter = true;
        this.groupSummaries.push(groupSummary);
    }

    parseColumn(type?: string): void {
        // Group by AssetClass, then by SecurityType
        if (type.includes("Table1")) {
            this.addClassification(Classifications.AssetClass);
            this.addClassification(Classifications.SecurityType);
            this.addClassification(Classifications.Security);
        }

        // Group by Asset Class
        else if (type.includes("Table2")) {
            this.addClassification(Classifications.AssetClass);
        }

        // Group by Security Type
        else if (type.includes("Table3")) {
            this.addClassification(Classifications.SecurityType);
        }

        // Group by Security
        else if (type.includes("Table4")) {
            this.addClassification(Classifications.Security);
        }

        this.columns.map((item: IGridColumn) => {
            if (item.visible && !item.isClassification) {
                this.dsColumns.push({
                    selector: "r-textbox",
                    options: {
                        name: item.dataField,
                        value: item.dataField,
                        id: item.dataField,
                        type: "column",
                        className: "tb",
                        editClassName: "tb-edit",
                        level: "top"
                    }
                });
            }
        });
    }

    addClassification(type: string, mode: string = ActionModes.Add, order: string = "Ascending") {
        let isExisted: RTextbox = this.dsClassifications.find((tx: RTextbox) => type === tx.options.name);
        if (isExisted && mode === ActionModes.Add) {
            return;
        }
        if (isExisted && mode === ActionModes.Edit) {
            appraisalData.sort((a: any, b: any): number => {
                return order === "Ascending" ? (a[type] < b[type] ? -1 : 1) : (a[type] < b[type] ? 1 : -1);
            });
            if (this.dsClassifications.length === 1) {
                this.gridData = this.fetchData(type);
            } else {
                this.gridData = this.fetchData(Classifications.Security);
            }
            return;
        }

        let orginalIndex: number = 1;

        if (mode === ActionModes.Add) {
            this.columns.map((col: IGridColumn) => {
                if (col.dataField === type) {
                    col.visible = true;
                    col.groupIndex = -1;
                    col.caption = Caption;
                }
                if (col.isClassification && col.dataField !== type) {
                    col.visible = false;
                    col.groupIndex = this.dsClassifications.findIndex((tx: RTextbox) => col.dataField === tx.options.name);
                }
            });
        }

        else if (mode === ActionModes.Edit) {
            this.columns.map((col: IGridColumn) => {
                if (col.dataField === this.overlayOptions.orginalName) {
                    col.visible = false;
                    col.groupIndex = -1;
                }
                if (col.dataField === type) {
                    col.visible = true;
                    orginalIndex = this.dsClassifications.findIndex((tx: RTextbox) => this.overlayOptions.orginalName === tx.options.name);
                    col.groupIndex = (orginalIndex || this.dsClassifications.length === 1) ? -1 : 0;
                    col.caption = (orginalIndex || this.dsClassifications.length === 1) ? Caption : col.caption;
                }
            });
        }

        this.summaries.map((sum: IGridColumnSummary) => {
            if (sum.customizeText === customizeSummaryText && (orginalIndex || this.dsClassifications.length === 1)) {
                sum.column = type;
            }
        });

        this.groupSummaries.map((sum: IGridColumnSummary) => {
            if (sum.customizeText === customizeGroupText && (orginalIndex || this.dsClassifications.length === 1)) {
                sum.column = type;
            }
        });

        appraisalData.sort((a: any, b: any): number => {
            return order === "Ascending" ? (a[type] < b[type] ? -1 : 1) : (a[type] < b[type] ? 1 : -1);
        });

        if (mode === ActionModes.Add) {
            if (this.dsClassifications.length === 0) {
                this.gridData = this.fetchData(type);
            } else {
                this.gridData = this.fetchData(Classifications.Security);
            }

            this.dsClassifications.push({
                selector: "r-textbox",
                options: {
                    name: type,
                    value: type,
                    type: DataSourceTypes.Classification,
                    className: TEXTBOX_CLASSNAME,
                    editClassName: TEXTBOX_EDIT_CLASSNAME
                }
            });
        }
        else if (mode === ActionModes.Edit) {
            if (this.dsClassifications.length === 1) {
                this.gridData = this.fetchData(type);
            } else {
                this.gridData = this.fetchData(Classifications.Security);
            }

            this.dsClassifications.map((item: RTextbox) => {
                if (item.options.name === this.overlayOptions.orginalName) {
                    item.options.name = this.overlayOptions.classification;
                    item.options.value = this.overlayOptions.classification;
                }
            });
        }
    }

    removeClassification(type: string) {
        let remainType: string = "";
        this.columns.map((col: IGridColumn) => {
            if (col.isClassification) {
                if (this.dsClassifications.length === 1) {
                    col.groupIndex = -1;
                    col.caption = col.dataField;
                    col.visible = true;
                    remainType = Classifications.AssetClass;
                }
                else {
                    if (col.dataField === type) {
                        col.groupIndex = -1;
                        col.caption = type;
                        col.visible = false;
                    }
                    else {
                        let removedIndex: number = this.dsClassifications.findIndex((tx: RTextbox) => tx.options.name === type);
                        let index: number = this.dsClassifications.findIndex((tx: RTextbox) => tx.options.name === col.dataField);
                        if (this.dsClassifications.length === 2) {
                            col.groupIndex = -1;
                            col.caption = index > -1 ? Caption : col.dataField;
                            col.visible = index > -1;
                            if (index > -1) {
                                remainType = col.dataField;
                            }
                        }
                        if (this.dsClassifications.length === 3) {
                            if (removedIndex === 0) {
                                if (index === 1) {
                                    col.groupIndex = 0;
                                    col.caption = col.dataField;
                                    col.visible = false;
                                }
                                if (index === 2) {
                                    col.groupIndex = -1;
                                    col.caption = Caption;
                                    col.visible = true;
                                    remainType = col.dataField;
                                }
                            }

                            if (removedIndex === 1) {
                                if (index === 2) {
                                    col.groupIndex = -1;
                                    col.caption = Caption;
                                    col.visible = true;
                                    remainType = col.dataField;
                                }
                            }

                            if (removedIndex === 2) {
                                if (index === 1) {
                                    col.groupIndex = -1;
                                    col.caption = Caption;
                                    col.visible = true;
                                    remainType = col.dataField;
                                }
                            }
                        }
                    }
                }
            }
        });

        this.summaries.map((sum: IGridColumnSummary) => {
            if (sum.customizeText === customizeSummaryText) {
                sum.column = remainType;
            }
        });

        this.groupSummaries.map((sum: IGridColumnSummary) => {
            if (sum.customizeText === customizeGroupText) {
                sum.column = remainType;
            }
        })

        this.dsClassifications = this.dsClassifications.filter((tx: RTextbox) => tx.options.name !== type);
        if (this.dsClassifications.length === 1) {
            this.gridData = this.fetchData(remainType);
        } else {
            this.gridData = this.fetchData(Classifications.Security);
        }
    }

    reorderClassification() {
        let orders: Array<string> = this.tOptions.classic.children.map((tx: RTextbox) => {
            return tx.options.name;
        });
        let currentType: string = Classifications.AssetClass;
        this.columns.map((col: IGridColumn) => {
            if (col.isClassification) {
                if (orders.length === 2) {
                    if (col.dataField === orders[0]) {
                        col.groupIndex = 0;
                        col.caption = col.dataField;
                        col.visible = false;
                    }
                    else if (col.dataField === orders[1]) {
                        col.groupIndex = -1;
                        col.caption = Caption;
                        col.visible = true;
                        currentType = col.dataField;
                    }
                }
                if (orders.length === 3) {
                    if (col.dataField === orders[0]) {
                        col.groupIndex = 0;
                        col.caption = col.dataField;
                        col.visible = false;
                    }
                    else if (col.dataField === orders[1]) {
                        col.groupIndex = 1;
                        col.caption = col.dataField;
                        col.visible = false;
                    }
                    else if (col.dataField === orders[2]) {
                        col.groupIndex = -1;
                        col.caption = Caption;
                        col.visible = true;
                        currentType = col.dataField;
                    }
                }
            }

        });
        this.summaries.map((sum: IGridColumnSummary) => {
            if (sum.customizeText === customizeSummaryText) {
                sum.column = currentType;
            }
        });

        this.groupSummaries.map((sum: IGridColumnSummary) => {
            if (sum.customizeText === customizeGroupText) {
                sum.column = currentType;
            }
        });
        this.options.children[0].options.columns = this.columns;
        this.options.children[0].options.summaries = this.summaries;
        this.options.children[0].options.groupSummaries = this.groupSummaries;
    }

    fetchData(type: string): Array<any> {
        if (type === Classifications.AssetClass) {
            return appraisalData.filter((item: any) => item[Classifications.SecurityType] === "" && item[Classifications.Security] === "");
        } else if (type === Classifications.SecurityType) {
            return appraisalData.filter((item: any) => item[Classifications.SecurityType] !== "" && item[Classifications.Security] === "");
        } else if (type === Classifications.Security) {
            return appraisalData.filter((item: any) => item[Classifications.Security] !== "");
        }
        return [];
    }

    addGrid(event: any): void {
        let label: string = event.item.label;
        if (!label) {
            return;
        }
        if (this.options.children.length) {
            return;
        }
        this.initColumns();
        this.parseColumn(label);
        this.options.children.push({
            selector: "r-grid",
            options: {
                columns: this.columns,
                data: this.gridData,
                summaries: this.summaries,
                groupSummaries: this.groupSummaries
            }
        });
        this.tOptions.classic.children = this.dsClassifications;
        this.tOptions.column.children = this.dsColumns;
        this.classis = classifications;
        this.columnItems.push(...this.columns);
    }

    dragEnd(event: any): void {
        let label: string = event.target.innerText;
        if (!label) {
            return;
        }
        if (this.options.children.length) {
            return;
        }
        this.initColumns();
        this.parseColumn(label);
        this.options.children.push({
            selector: "r-grid",
            options: {
                columns: this.columns,
                data: this.gridData,
                summaries: this.summaries,
                groupSummaries: this.groupSummaries
            }
        });
        this.tOptions.classic.children = this.dsClassifications;
        this.tOptions.column.children = this.dsColumns;
        this.classis = classifications;
        this.columnItems.push(...this.columns);

        this.gridMenu.hide();
    }

    clearTemplate() {
        this.columns = [];
        this.columnItems = [];
        this.gridData = [];
        this.summaries = [];
        this.groupSummaries = [];
        this.dsClassifications = [];
        this.dsColumns = [];
        this.options.children = [];
        this.tOptions.classic.children = [];
        this.tOptions.column.children = [];
        this.groupItems = [];
    }

    onAfterHide() {
        this.overlayOptions = {
            title: "",
            tempTitle: "",
            type: "",
            column: "",
            classification: "",
            items: [],
            secondary: {
                children: []
            }
        };
        this.selectedListItem = null;
    }


}

enum ChartType {
    HighCharts = 1, ChartJS, ECharts, PlotyJS
}

function customizeGroupText(item) {
    return "Total Group";
}

function customizeSummaryText() {
    return "Total Portfolio";
}

function customizeSummaryResult(item) {
    return parseNumber(item && item.value);
}

function parseNumber(value: number): string {
    return value === Math.floor(value) ? value.toLocaleString() : Number(value.toFixed(1)).toLocaleString();
}


export const Classifications: Classification = {
    AssetClass: "Asset Class",
    SecurityType: "Security Type",
    Security: "Security",
    Type: "classification"
};

export const DataSourceTypes: DataSourceType = {
    Classification: "classification",
    Column: "column",
    Configuration: "configuration"
};

export const ActionModes: ActionMode = {
    Add: "add",
    Edit: "edit",
    Group: "group",
    Remove: "remove"
};

export const Caption: string = "Name";
export const TEXTBOX_CLASSNAME: string = "tb";
export const TEXTBOX_EDIT_CLASSNAME: string = "tb-edit";
export const Clasifis: string[] = [Classifications.AssetClass, Classifications.Security, Classifications.Security];
export const COLUMNS: string[] = ["Asset Class", "Security Type", "Security", "Quantity", "Unit Cost", "Price", "Total Cost", "Market Value", "% Asset"];

export interface Classification {
    AssetClass?: string;
    SecurityType?: string;
    Security?: string;
    Type?: string;
}

export interface DataSourceType {
    Classification?: string;
    Column?: string;
    Configuration?: string;
}

export interface RTextbox {
    selector: string;
    options: ITextBox;
}

export interface ActionMode {
    Add?: string;
    Edit?: string;
    Group?: string
    Remove?: string;
}

const classifications: any = [
    { id: "assetClass", label: "Asset Class" },
    { id: "security", label: "Security" },
    { id: "securityType", label: "Security Type" }
];

const genericdates: any = [
    {
        name: "{toda}",
        value: "09/06/2017",
        label: "Current Day"
    },
    {
        name: "{yest}",
        value: "09/05/2017",
        label: "Last Calendar Day"
    },
    {
        name: "{last}",
        value: "09/03/2017",
        label: "Last Trading Day"
    },
    {
        name: "{next}",
        value: "09/07/2017",
        label: "Next Trading Day"
    }
];

const currencies: any = [
    {
        label: "us- US Dollar",
        value: "USD"
    },
    {
        label: "au- Australian Dollar",
        value: "AUD"
    },
    {
        label: "cn- Chinese Yuan",
        value: "CN"
    },
    {
        label: "eu- Euro",
        value: "EU"
    },
    {
        label: "hk- Hong Kong Dollar",
        value: "HK"
    }
];

const pricesets: any = [
    {
        label: "Standard Price Set",
        value: "sps"
    },
    {
        label: "American Price Set",
        value: "aps"
    },
    {
        label: "European Price Set",
        value: "eps"
    }
];

const data2: any[] = [
    {
        quantity: parseNumber(4200),
        security: "APPLE INC COM",
        unitCost: 14.87,
        price: 15.19,
        assets: 2.3
    },
    {
        quantity: parseNumber(139),
        security: "HEWLETT PACKARD CO COM",
        unitCost: 229.98,
        price: 18.63,
        assets: 1.2
    },
    {
        quantity: parseNumber(67800),
        security: "AT&T",
        unitCost: 23.66,
        price: 18.87,
        assets: 3.6
    },
    {
        quantity: parseNumber(75600),
        security: "GOOGLE INC COM",
        unitCost: 23.56,
        price: 20.98,
        assets: 4.5
    },
    {
        quantity: parseNumber(876000),
        security: "ORACLE INC COM",
        unitCost: 17.87,
        price: 34.56,
        assets: 5.8
    }
];

const assetClass: string[] = ["Fixed Income", "Equity", "Cash"];

const appraisalData: any[] = [
    { "Asset Class": "Fixed Income", "Security Type": "NULL", "Security": "NULL", "Quantity": "NULL", "Unit Cost": "NULL", "Price": "NULL", "Total Cost": "45088.2", "Market Value": "45687.575", "% Asset": "0.39515339" },
    { "Asset Class": "Fixed Income", "Security Type": "Government Notes and Bonds", "Security": "NULL", "Quantity": "NULL", "Unit Cost": "NULL", "Price": "NULL", "Total Cost": "25085", "Market Value": "25671.875", "% Asset": "0.22203692" },
    { "Asset Class": "Fixed Income", "Security Type": "Government Notes and Bonds", "Security": "FEDERAL HOME LN BKS", "Quantity": "25000", "Unit Cost": "100.34", "Price": "102.6875", "Total Cost": "25085", "Market Value": "25671.875", "% Asset": "0.22203692" },
    { "Asset Class": "Fixed Income", "Security Type": "U.S. Municipal Notes and Bonds", "Security": "NULL", "Quantity": "NULL", "Unit Cost": "NULL", "Price": "NULL", "Total Cost": "20003.2", "Market Value": "20015.7", "% Asset": "0.17311647" },
    { "Asset Class": "Fixed Income", "Security Type": "U.S. Municipal Notes and Bonds", "Security": "CALIFORNIA ST", "Quantity": "10000", "Unit Cost": "100.014", "Price": "100.011", "Total Cost": "10001.4", "Market Value": "10001.1", "% Asset": "0.086499854" },
    { "Asset Class": "Fixed Income", "Security Type": "U.S. Municipal Notes and Bonds", "Security": "PORTLAND ORE NEW PUB HSG AUTH", "Quantity": "10000", "Unit Cost": "100.018", "Price": "100.146", "Total Cost": "10001.8", "Market Value": "10014.6", "% Asset": "0.086616616" },
    { "Asset Class": "Equity", "Security Type": "NULL", "Security": "NULL", "Quantity": "NULL", "Unit Cost": "NULL", "Price": "NULL", "Total Cost": "5172570.77", "Market Value": "9911044.71", "% Asset": "85.72096273" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "NULL", "Quantity": "NULL", "Unit Cost": "NULL", "Price": "NULL", "Total Cost": "5172570.77", "Market Value": "9911044.71", "% Asset": "85.72096273" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "ADVENT SOFTWARE INC COM", "Quantity": "100000", "Unit Cost": "28.94", "Price": "28.94", "Total Cost": "2894000", "Market Value": "2894000", "% Asset": "25.03030441" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "AGUILA AMERN GOLD LTD COM NEW", "Quantity": "5200", "Unit Cost": "19.905", "Price": "16.54", "Total Cost": "103506", "Market Value": "86008", "% Asset": "0.743886117" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "ALASKA AIR GROUP INC COM", "Quantity": "1300", "Unit Cost": "34.31", "Price": "35.72", "Total Cost": "44603", "Market Value": "46436", "% Asset": "0.401626543" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "ANN INC COM", "Quantity": "1350", "Unit Cost": "7.851851852", "Price": "34.52", "Total Cost": "10600", "Market Value": "46602", "% Asset": "0.403062283" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "ANN INC COM", "Quantity": "4500", "Unit Cost": "6.207777778", "Price": "34.52", "Total Cost": "27935", "Market Value": "155340", "% Asset": "1.343540942" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "AT&T INC COM", "Quantity": "225", "Unit Cost": "138.5388889", "Price": "24.49", "Total Cost": "31171.25", "Market Value": "5510.25", "% Asset": "0.04765834" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "AT&T INC COM", "Quantity": "315", "Unit Cost": "126.7333333", "Price": "24.49", "Total Cost": "39921", "Market Value": "7714.35", "% Asset": "0.066721675" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "BANK NEW YORK MELLON CORP COM", "Quantity": "1200", "Unit Cost": "59.155", "Price": "31.85", "Total Cost": "70986", "Market Value": "38220", "% Asset": "0.33056608" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "BARNES & NOBLE INC COM", "Quantity": "1900", "Unit Cost": "27.0925", "Price": "42.67", "Total Cost": "51475.75", "Market Value": "81073", "% Asset": "0.701203134" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "BAXTER INTL INC COM", "Quantity": "2600", "Unit Cost": "27.265", "Price": "37.65", "Total Cost": "70889", "Market Value": "97890", "% Asset": "0.846653939" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "BLACK & DECKER CORP COM", "Quantity": "1400", "Unit Cost": "37.8425", "Price": "86.96", "Total Cost": "52979.5", "Market Value": "121744", "% Asset": "1.052967996" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "BOISE CASCADE CO", "Quantity": "700", "Unit Cost": "31.53", "Price": "0.49", "Total Cost": "22071", "Market Value": "343", "% Asset": "0.002966619" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "BOISE CASCADE CO", "Quantity": "1400", "Unit Cost": "36.3425", "Price": "0.49", "Total Cost": "50879.5", "Market Value": "686", "% Asset": "0.005933237" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "CHEVRON CORP NEW COM", "Quantity": "2772", "Unit Cost": "37.92532468", "Price": "56.77", "Total Cost": "105129", "Market Value": "157366.44", "% Asset": "1.361067691" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "CONAGRA FOODS INC COM", "Quantity": "2300", "Unit Cost": "29.0925", "Price": "20.28", "Total Cost": "66912.75", "Market Value": "46644", "% Asset": "0.403425542" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "CONSOLIDATED EDISON INC COM", "Quantity": "700", "Unit Cost": "45.5925", "Price": "46.33", "Total Cost": "31914.75", "Market Value": "32431", "% Asset": "0.280496822" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "CONSOLIDATED EDISON INC COM", "Quantity": "800", "Unit Cost": "44.4675", "Price": "46.33", "Total Cost": "35574", "Market Value": "37064", "% Asset": "0.320567796" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "DOW CHEM CO COM", "Quantity": "600", "Unit Cost": "31.84333333", "Price": "43.82", "Total Cost": "19106", "Market Value": "26292", "% Asset": "0.227400402" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "DOW CHEM CO COM", "Quantity": "1500", "Unit Cost": "31.92666667", "Price": "43.82", "Total Cost": "47890", "Market Value": "65730", "% Asset": "0.568501005" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "DOW CHEM CO COM", "Quantity": "1933", "Unit Cost": "27.91278709", "Price": "43.82", "Total Cost": "53955.41744", "Market Value": "84704.06", "% Asset": "0.732608295" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "FREESCALE SEMICONDUCTOR INC CL B", "Quantity": "397", "Unit Cost": "18.2502629", "Price": "25.17", "Total Cost": "7245.35437", "Market Value": "9992.49", "% Asset": "0.086425386" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "GENERAL ELECTRIC CO COM", "Quantity": "500", "Unit Cost": "31.09448", "Price": "35.05", "Total Cost": "15547.24", "Market Value": "17525", "% Asset": "0.151574321" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "GENERAL ELECTRIC CO COM", "Quantity": "5350", "Unit Cost": "3.55", "Price": "35.05", "Total Cost": "18992.5", "Market Value": "187517.5", "% Asset": "1.621845234" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "GOLDMAN SACHS GROUP INC PFD 6.125  CALL", "Quantity": "1131", "Unit Cost": "45.13793103", "Price": "48.15", "Total Cost": "51051", "Market Value": "54457.65", "% Asset": "0.471006067" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "GOLDMAN SACHS GROUP INC PFD 6.125  CALL", "Quantity": "1396", "Unit Cost": "26.55838109", "Price": "48.15", "Total Cost": "37075.5", "Market Value": "67217.4", "% Asset": "0.581365578" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "GOOGLE INC CL C", "Quantity": "900", "Unit Cost": "99.04111111", "Price": "414.86", "Total Cost": "89137", "Market Value": "373374", "% Asset": "3.229324423" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "HEWLETT PACKARD CO COM", "Quantity": "139", "Unit Cost": "229.9802372", "Price": "28.63", "Total Cost": "31967.25296", "Market Value": "3979.57", "% Asset": "0.034419436" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "HOME DEPOT INC COM", "Quantity": "1000", "Unit Cost": "26", "Price": "40.48", "Total Cost": "26000", "Market Value": "40480", "% Asset": "0.350112897" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "HOME DEPOT INC COM", "Quantity": "1000", "Unit Cost": "27", "Price": "40.48", "Total Cost": "27000", "Market Value": "40480", "% Asset": "0.350112897" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "HORACE MANN EDUCATORS CORP NEW COM", "Quantity": "900", "Unit Cost": "35.3425", "Price": "18.96", "Total Cost": "31808.25", "Market Value": "17064", "% Asset": "0.147587116" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "HORACE MANN EDUCATORS CORP NEW COM", "Quantity": "1000", "Unit Cost": "35.28", "Price": "18.96", "Total Cost": "35280", "Market Value": "18960", "% Asset": "0.163985685" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "INGERSOLL-RAND PLC SHS", "Quantity": "200", "Unit Cost": "43.655", "Price": "40.37", "Total Cost": "8731", "Market Value": "8074", "% Asset": "0.069832301" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "INGERSOLL-RAND PLC SHS", "Quantity": "1300", "Unit Cost": "38.5925", "Price": "40.37", "Total Cost": "50170.25", "Market Value": "52481", "% Asset": "0.453909954" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "INTERNATIONAL BUSINESS MACHS COM", "Quantity": "460", "Unit Cost": "72.73125", "Price": "82.2", "Total Cost": "33456.375", "Market Value": "37812", "% Asset": "0.327037274" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "INTERNATIONAL BUSINESS MACHS COM", "Quantity": "50000", "Unit Cost": "1.2", "Price": "82.2", "Total Cost": "60000", "Market Value": "4110000", "% Asset": "35.54752976" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "KELLY SVCS INC CL A", "Quantity": "200", "Unit Cost": "32.78", "Price": "26.22", "Total Cost": "6556", "Market Value": "5244", "% Asset": "0.045355534" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "KELLY SVCS INC CL A", "Quantity": "1800", "Unit Cost": "28.78", "Price": "26.22", "Total Cost": "51804", "Market Value": "47196", "% Asset": "0.408199809" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "LIZ CLAIBORNE INC COM", "Quantity": "4000", "Unit Cost": "25.60875", "Price": "35.82", "Total Cost": "102435", "Market Value": "143280", "% Asset": "1.239233592" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "MERITUS MINERALS LTD COM", "Quantity": "1600", "Unit Cost": "43.3275", "Price": "67.73", "Total Cost": "69324", "Market Value": "108368", "% Asset": "0.937278517" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "MOTOROLA SOLUTIONS INC", "Quantity": "3600", "Unit Cost": "17.18239722", "Price": "22.59", "Total Cost": "61856.63", "Market Value": "81324", "% Asset": "0.703374041" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "OFFICE DEPOT INC COM", "Quantity": "4400", "Unit Cost": "18.03", "Price": "31.4", "Total Cost": "79332", "Market Value": "138160", "% Asset": "1.194950538" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "PACIFICARE HEALTH SYS DEL COM", "Quantity": "600", "Unit Cost": "43.015", "Price": "0.14", "Total Cost": "25809", "Market Value": "84", "% Asset": "0.000726519" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "PACIFICARE HEALTH SYS DEL COM", "Quantity": "1000", "Unit Cost": "35.4525", "Price": "0.14", "Total Cost": "35452.5", "Market Value": "140", "% Asset": "0.001210865" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "PG&E CORP COM", "Quantity": "2100", "Unit Cost": "32.0925", "Price": "37.12", "Total Cost": "67394.25", "Market Value": "77952", "% Asset": "0.674209499" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "RAYTHEON CO COM NEW", "Quantity": "2100", "Unit Cost": "50.7175", "Price": "40.15", "Total Cost": "106506.75", "Market Value": "84315", "% Asset": "0.729243302" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "RIA RES CORP COM", "Quantity": "80", "Unit Cost": "240.4625", "Price": "3.65", "Total Cost": "19237", "Market Value": "292", "% Asset": "0.002525518" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "RIA RES CORP COM", "Quantity": "140", "Unit Cost": "254.525", "Price": "3.65", "Total Cost": "35633.5", "Market Value": "511", "% Asset": "0.004419656" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "RIA RES CORP COM", "Quantity": "200", "Unit Cost": "246.5", "Price": "3.65", "Total Cost": "49300", "Market Value": "730", "% Asset": "0.006313795" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "TEKTRONIX INC COM", "Quantity": "3200", "Unit Cost": "21.015", "Price": "28.21", "Total Cost": "67248", "Market Value": "90272", "% Asset": "0.780765598" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "WALGREENS BOOTS ALLIANCE INC COM", "Quantity": "1400", "Unit Cost": "28.3725", "Price": "44.26", "Total Cost": "39721.5", "Market Value": "61964", "% Asset": "0.535928743" },
    { "Asset Class": "Cash", "Security Type": "NULL", "Security": "NULL", "Quantity": "NULL", "Unit Cost": "NULL", "Price": "NULL", "Total Cost": "1586466.73", "Market Value": "1586466.73", "% Asset": "13.7214047" },
    { "Asset Class": "Cash", "Security Type": "Cash Accounts", "Security": "NULL", "Quantity": "NULL", "Unit Cost": "NULL", "Price": "NULL", "Total Cost": "1586466.73", "Market Value": "1586466.73", "% Asset": "13.7214047" },
    { "Asset Class": "Cash", "Security Type": "Cash Accounts", "Security": "Dividend Accrual (usd)", "Quantity": "NULL", "Unit Cost": "NULL", "Price": "NULL", "Total Cost": "-11138.55", "Market Value": "-11138.55", "% Asset": "-0.096337698" },
    { "Asset Class": "Cash", "Security Type": "Cash Accounts", "Security": "U.S. DOLLAR", "Quantity": "NULL", "Unit Cost": "NULL", "Price": "NULL", "Total Cost": "1597605.28", "Market Value": "1597605.28", "% Asset": "13.81774239" }
];





