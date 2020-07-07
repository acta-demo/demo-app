const SNIPPETS = [
    {
        dataid: '179',
        datacontent:
            '<span class="standardword" data-id="153" data-type="str" data-language="en">Minutes</span> of the sitting of <span class="variable" data-id="197" data-type="var_date">UNRESOLVED</span>',
        datadesc: 'Minutes of',
        language: 'en',
    },
    {
        dataid: '179',
        datacontent:
            '<span class="standardword" data-id="153" data-type="str" data-language="de">Protokoll</span> der Sitzung vom <span class="variable" data-id="197" data-type="var_date">UNRESOLVED</span>',
        datadesc: 'Minutes of',
        language: 'de',
    },
    {
        dataid: '180',
        datacontent:
            'The sitting opened at <span class="variable" data-id="157" data-type="var_time">UNRESOLVED</span>',
        datadesc: 'Sitting open',
        language: 'en',
    },
    {
        dataid: '180',
        datacontent:
            'Die Sitzung wird um <span class="variable" data-id="157" data-type="var_time">UNRESOLVED</span>',
        datadesc: 'Sitting open',
        language: 'de',
    },
    {
        dataid: '181',
        datacontent:
            'Explanations of vote would continue at the following day\'s sitting, on <span class="variable" data-id="201" data-type="var_date">UNRESOLVED</span>',
        datadesc: 'Explanations of vote',
        language: 'en',
    },
    {
        dataid: '181',
        datacontent:
            'Explanations of vote would continue at the following day\'s sitting, on <span class="variable" data-id="201" data-type="var_date">UNRESOLVED</span>',
        datadesc: 'Explanations of vote',
        language: 'de',
    },
    {
        dataid: '182',
        datacontent:
            '<span class="standardword" data-id="190" data-type="str">The agenda of the next day\'s sitting had been established</span> <span class="standardword" data-id="1234" data-type="str">Agenda</span> <span class="variable" data-id="1811" data-type="var_str">UNRESOLVED</span>',
        datadesc: 'Next day Agenda',
        language: 'en',
    },
    {
        dataid: '182',
        datacontent:
            '<span class="standardword" data-id="190" data-type="str">Die Tagesordnung für die Sitzung am folgenden Tag ist festgelegt</span> <span class="standardword" data-id="1234" data-type="str">\'Dokument \„Tagesordnung\“\'</span> <span class="variable" data-id="1811" data-type="var_str">UNRESOLVED</span>',
        datadesc: 'Next day Agenda',
        language: 'de',
    },
    {
        dataid: '183',
        datacontent:
            '<span class="lsp" data-id="162" data-viewmode="infoview" data-type="var_sp" data-json="" data-content="">UNRESOLVED</span>  <span class="standardword" data-id="1006" data-type="str">made the statements</span>',
        datadesc: 'Made statements',
        language: 'en',
    },
    {
        dataid: '183',
        datacontent:
            '<span class="lsp" data-id="162" data-viewmode="infoview" data-type="var_sp" data-json="" data-content="">UNRESOLVED</span>  <span class="standardword" data-id="1006" data-type="str">geben die Erklärungen ab</span>',
        datadesc: 'Made statements',
        language: 'de',
    },
    {
        dataid: '184',
        datacontent:
            '<span class="lsp" data-id="161" data-viewmode="infoview" data-type="var_sp" data-json="">UNRESOLVED</span> <span class="standardword" data-id="1009" data-type="str">introduced the report</span>',
        datadesc: 'Intro report',
        language: 'en',
    },
    {
        dataid: '184',
        datacontent:
            '<span class="lsp" data-id="161" data-viewmode="infoview" data-type="var_sp" data-json="">UNRESOLVED</span> <span class="standardword" data-id="1009" data-type="str">erläutert den Bericht</span>',
        datadesc: 'Intro report',
        language: 'de',
    },
    {
        dataid: '185',
        datacontent:
            '<span class="standardword" data-id="1007" data-type="str">The following spoke:</span> <span class="lsp" data-id="161" data-viewmode="infoview" data-type="var_sp" data-json="">UNRESOLVED</span>',
        datadesc: 'Following spoke',
        language: 'en',
    },
    {
        dataid: '185',
        datacontent:
            '<span class="standardword" data-id="1007" data-type="str">Es sprechen:</span> <span class="lsp" data-id="161" data-viewmode="infoview" data-type="var_sp" data-json="">UNRESOLVED</span>',
        datadesc: 'Following spoke',
        language: 'de',
    },
    {
        dataid: '186',
        datacontent:
            '<span class="standardword" data-id="1004" data-type="str">Council and Commission statements:</span><span class="title" data-id="34343" data-viewmode="infoview" data-type="title" data-json="">UNRESOLVED</span>',
        datadesc: 'Statements',
        language: 'en',
    },
    {
        dataid: '186',
        datacontent:
            '<span class="standardword" data-id="1004" data-type="str">Erklärungen des Rates und der Kommission:</span><span class="title" data-id="34343" data-viewmode="infoview" data-type="title" data-json="">UNRESOLVED</span>',
        datadesc: 'Statements',
        language: 'de',
    },
    {
        dataid: '187',
        datacontent:
            '<span class="standardword" data-id="140" data-type="str">IN THE CHAIR:</span> <span class="lsp" data-id="161" data-viewmode="infoview" data-type="var_sp" data-json="" data-content="">UNRESOLVED</span>',
        datadesc: 'In the chair',
        language: 'en',
    },
    {
        dataid: '187',
        datacontent:
            '<span class="standardword" data-id="140" data-type="str">VORSITZ:</span> <span class="lsp" data-id="161" data-viewmode="infoview" data-type="var_sp" data-json="" data-content="">UNRESOLVED</span>',
        datadesc: 'In the chair',
        language: 'de',
    },
    {
        dataid: '188',
        datacontent:
            '<span class="lsp" data-id="161" data-viewmode="infoview" data-type="var_sp" data-json="" data-content="">UNRESOLVED</span> <span class="standardword" data-id="189" data-type="str">on</span> <span class="title" data-id="34343" data-viewmode="infoview" data-type="title" data-json="">UNRESOLVED</span>',
        datadesc: 'Speakers on',
        language: 'en',
    },
    {
        dataid: '188',
        datacontent:
            '<span class="lsp" data-id="161" data-viewmode="infoview" data-type="var_sp" data-json="" data-content="">UNRESOLVED</span> <span class="standardword" data-id="189" data-type="str">zur</span> <span class="title" data-id="34343" data-viewmode="infoview" data-type="title" data-json="">UNRESOLVED</span>',
        datadesc: 'Speakers on',
        language: 'de',
    },
    {
        dataid: '189',
        datacontent:
            '<span class="title" data-id="34343" data-viewmode="infoview" data-type="title" data-json="">UNRESOLVED</span> <span class="standardword" data-id="196" data-type="str">Rapporteur</span> <span class="lsp" data-id="161" data-viewmode="infoview" data-type="var_sp" data-json="" data-content="">UNRESOLVED</span>',
        datadesc: 'Rapporteur',
        language: 'en',
    },
    {
        dataid: '189',
        datacontent:
            '<span class="title" data-id="34343" data-viewmode="infoview" data-type="title" data-json="">UNRESOLVED</span> <span class="standardword" data-id="196" data-type="str">Berichterstatterin:</span> <span class="lsp" data-id="161" data-viewmode="infoview" data-type="var_sp" data-json="" data-content="">UNRESOLVED</span>',
        datadesc: 'Rapporteur',
        language: 'de',
    },
    {
        dataid: '190',
        datacontent:
            '<span class="standardword" data-id="193" data-type="str">The President would consult the</span> <span class="variable" data-id="1771" data-type="var_str">UNRESOLVED</span> <span class="standardword" data-id="194" data-type="str">and the</span> <span class="variable" data-id="1772" data-type="var_str">UNRESOLVED</span> <span class="standardword" data-id="195" data-type="str">on this proposal, in accordance with</span> <span class="standardword" data-id="145" data-type="str">Rule145(1)</span> <span class="standardword" data-id="197" data-type="str">and</span> <span class="standardword" data-id="1465" data-type="str">Rule146(1)</span>',
        datadesc: 'President consult',
        language: 'en',
    },
    {
        dataid: '190',
        datacontent:
            '<span class="standardword" data-id="193" data-type="str" data-language="de">Gemäß</span> <span class="standardword" data-id="145" data-type="str" data-language="de">Rule145(1)</span> <span class="standardword" data-id="197" data-type="str" data-language="de">und</span> <span class="standardword" data-id="1465" data-type="str" data-language="de">Rule146(1)</span> <span class="variable" data-id="1771" data-type="var_str" data-language="de">UNRESOLVED</span> <span class="standardword" data-id="194" data-type="str" data-language="de">und den</span> <span class="variable" data-id="1772" data-type="var_str" data-language="de">UNRESOLVED</span> <span class="standardword" data-id="198" data-type="str" data-language="de">konsultieren</span>.',
        datadesc: 'President consult',
        language: 'de',
    },
];
export default SNIPPETS;
