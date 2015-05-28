(function($){
  
  $(document).ready(function() {
    //alert("JS");
    // $(window).resize(function(){
    //       drawChart();
    //     });
    //var chart;

    $("#data_category").on("change", setMainData);
    $("#generate_button").on("click", generateGraph);
    $(document).on("change", "#data_main", setDetails);
   // $("#export_button").on("click", showModal);
    $(".btn-export").on("click", exportChart);
    google.load('visualization', '1.0', {'packages':['corechart'], 'callback': drawChart});

    setFields();

  });

  // function showModal(){
  //   $('.report_modal_body').hide();
  //   $('#report_modal').modal('show');
  //   $('#report_body').show();
  // }

  function setFields(){

    $.ajax({
      type : 'post',
      dataType: 'json',
      url : Drupal.settings.basePath + 'reports/organization',
      beforeSend: function () {
        $('#organization_name').attr('disabled','disabled');
      },
      success : function(result) {
        $('#organization_name').removeAttr('disabled');
        for (var i=0; i<result.length; i++)
          $('#organization_name').append('<option value="'+result[i]+'">'+result[i]+'</option>');
      }
    });

  }

  function exportChart(){
    var id = this.id;
    alert(id+"~~");

    if(id == 'pdf_button'){
      var htmlContent = $("#uri_div").html();
      $("#htmlContentHidden").val(htmlContent);
      $('#savePDFForm').submit();
    }
    else if(id == 'image_button')
      download(chart.getImageURI(), 'data.png', "image/png"); 
    else if(id == 'csv_button')
      download(csv_array, "data.csv", "text/csv");
  }
  


  function setDetails(){
    
  //  var main_data = $(this).find('option:selected').val();
  //  alert(main_data);
    alert(this.value);
  }

  function setMainData(){
    var category = $('#data_category').val();
    $('#data_main_div').html('<select class="form-control" disabled><option value="0">--</option></select>');        
    
    
    if(category != "--"){
      if(category == 'basic'){
        var str = '<option value="data_sex">Sex</option><option value="data_age">Age</option><option value="data_batch">Batch</option><option value="data_organization_name">Organization Name</option><option value="data_organization_type">Organization Type</option><option value="data_job_company">Company</option><option value="data_job_position">Job Position</option>';
        $('#data_main_div').html('<select id="data_main" class="form-control">'+str+'</select>');
      }
      else{
        $.ajax({
          type : 'post',
          dataType: 'json',
          data: {
            'category' : category
          },
          url : Drupal.settings.basePath + 'reports/main_data',
          beforeSend: function () {
            $('#data_main_loading').show();
          },
          success : function(result) {
            var str = '';
            for (var i=0; i<result.length; i++)
              str += '<option value="'+result[i][0]+'">'+result[i][1]+'</option>';
            $('#data_main_loading').hide();
            $('#data_main_div').html('<select id="data_main" class="form-control">'+str+'</select>');
          }
        });
      }
    }

  }

  function generateGraph(){
    var qid = $('#data_main').val();
    var min_age = $('#min_age').val();
    var max_age = $('#max_age').val();
    var min_batch = $('#min_batch').val();
    var max_batch = $('#max_batch').val();
    var organization_name = $('#organization_name').val();
    var organization_type = $('#organization_type').val();


    var sex = [];
    $(".sex_input:checked").each(function(){
       sex.push($(this).val());
    });

    $.ajax({
      type : 'post',
      dataType: 'json',
      data: {
        'qid' : qid,
        'sex' : sex,
        'min_age' : min_age,
        'max_age' : max_age,
        'min_batch' : min_batch,
        'max_batch' : max_batch,
        'organization_name' : organization_name,
        'organization_type' : organization_type
        //'location' : location
      },
      url : Drupal.settings.basePath + 'reports/result',
      beforeSend: function () {
        $('#visualization_div').hide();
        $('#export_dropdown').attr('disabled','disabled');
        $('#chart_loading').show();
      },
      success : function(data) {
        $('#chart_loading').hide();
        $('#visualization_div').show();
        $('#visualization_div').html(drawChart(data));
      }
   
    });
    
  }
  function drawChart(values) {
    /* LINE CHART
    var data = google.visualization.arrayToDataTable([
      ['Year', value, 'Expenses'],
      ['2012',  1000,      400],
      ['2014',  1170,      460],
      ['2015',  1000,       1120],
      ['2016',  1030,      540]
    ]);

    var options = {
      title: 'Company Performance',
      hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
      vAxis: {minValue: 0}
    };*/


        // var data = google.visualization.arrayToDataTable([
        //   ['Task', 'Hours per Day'],
        //   ['Work',     11],
        //   ['Eat',      2],
        //   ['Commute',  2],
        //   ['Watch TV', 2],
        //   ['Sleep',    7]
        // ]);

        // var options = {
        //   title: 'My Daily Activities'
        // };

        // var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        // chart.draw(data, options);


    var chart_type = 'pie';//$('#data_visualization').val();
    var data = new google.visualization.DataTable();
    data.addColumn('string', values[0][0]);
    data.addColumn('number', values[0][1]);
    console.log(values[0][0]+", "+values[0][1]);

    for(i = 1; i < values.length; i++){
      data.addRow([values[i][0], values[i][1]]);
      console.log(values[i][0]+", "+values[i][1]);
    }

    var options = {
      title: 'My Daily Activities'
    };

    
    
    switch (chart_type){
      
      case 'bar':
        chart = new google.visualization.BarChart(document.getElementById('visualization_div'));
        break;
      case 'bubble':
        chart = new google.visualization.BubbleChart(document.getElementById('visualization_div'));
        break;
      case 'combo':
        chart = new google.visualization.ComboChart(document.getElementById('visualization_div'));
        break;
      case 'histogram':
        chart = new google.visualization.Histogram(document.getElementById('visualization_div'));
        break;
      case 'line':
        chart = new google.visualization.LineChart(document.getElementById('visualization_div'));
        break;  
      case 'pie_3d':
        //options.push('is3D: true');
      case 'pie':
        chart = new google.visualization.PieChart(document.getElementById('visualization_div'));
        break;
      case 'table':
        chart = new google.visualization.Table(document.getElementById('visualization_div'));
     
      new google.chart.Query('https://spreadsheets.google.com/tq?key=pCQbetd-CptHnwJEfo8tALA').
        send(queryCallback);
    }

   
    google.visualization.events.addListener(chart, 'ready', function ()      {
      document.getElementById('uri_div').innerHTML = '<img src="' + chart.getImageURI() + '">';
    });


    chart.draw(data, options);
    csv_array = values.join('\r\n');

    $('#export_dropdown').removeAttr('disabled');

  }
/*

  function queryCallback(response) {
    chart.draw(response.getDataTable(), {is3D: true});
  }


  function drawToolbar() {
    var components = [
        {type: 'igoogle', datasource: 'https://spreadsheets.google.com/tq?key=pCQbetd-CptHnwJEfo8tALA',
         gadget: 'https://www.google.com/ig/modules/pie-chart.xml',
         userprefs: {'3d': 1}},
        {type: 'html', datasource: 'https://spreadsheets.google.com/tq?key=pCQbetd-CptHnwJEfo8tALA'},
        {type: 'csv', datasource: 'https://spreadsheets.google.com/tq?key=pCQbetd-CptHnwJEfo8tALA'},
        {type: 'htmlcode', datasource: 'https://spreadsheets.google.com/tq?key=pCQbetd-CptHnwJEfo8tALA',
         gadget: 'https://www.google.com/ig/modules/pie-chart.xml',
         userprefs: {'3d': 1},
         style: 'width: 800px; height: 700px; border: 3px solid purple;'}
    ];

    var container = document.getElementById('toolbar_div');
    google.visualization.drawToolbar(container, components);
  };

*/
  

})(jQuery);