(function($){
  
  $(document).ready(function() {

    $("#data_category").on("change", setMainData);
    //$("#generate_button").on("click", generateReport);
    $(document).on("change", "#data_main", setDetails);
    $(document).on("change", "#organization_name", setCurrentOrganizationType);
    $(document).on("change", "#organization_type", setAllOrganizationName);

   // $("#export_button").on("click", showModal);
    $(".btn-export").on("click", exportChart);
    $("#reset_button").on("click", resetFields);
   // $(function () { $("input,select,checkbox,textarea").not("[type=submit]").jqBootstrapValidation(); } );
    
    // $('#generate_report_form').on('submit', function (e) {
    //   if (e.isDefaultPrevented()) {
    //     alert('error');
    //   } else {
    //     e.preventDefault();
    //     generateReport();
    //     $('#generate_button').removeAttr('disabled');

    //   }
    // });

    $("#generate_button").on("click", function (e){
     

    //  alert("DO");
  //    $('#disable_submit').val(Math.random);
    });

    google.load('visualization', '1.0', {'packages':['corechart'], 'callback': drawChart});
    $('#data_visualization').val('pie');
    setAllOrganizationName();
    setAllOrganizationType();
    setFormValidation();
    prev_value = '';

  });

  function resetFields(){

      $('.sex_input').prop('checked', true);
      setAllOrganizationName();
      setAllOrganizationType();
      $('.user_filter').removeAttr('disabled');
      $(".user_filter").val("");
      $('#generate_report_form').data('formValidation').resetForm();
  }

  function setDetails(){
    if($('#data_category'). val() == 'basic'){
      
      if(prev_value == 'data_sex')
        $('.sex_input').removeAttr('disabled');
      else if(prev_value == 'data_organization_name')
        $('#organization_name').removeAttr('disabled');
      else if(prev_value == 'data_organization_type')
        $('#organization_type').removeAttr('disabled');

      

      if(this.value == 'data_sex'){
        $('.sex_input').prop('checked', true);
        $('.sex_input').attr('disabled', 'disabled');
      }

      else if(this.value == 'data_age'){
       // $('.sex_input').attr('disabled', 'disabled');
      }

      else if(this.value == 'data_batch'){
       // $('.sex_input').attr('disabled', 'disabled');
      }

      else if(this.value == 'data_organization_name'){
        setAllOrganizationName();
        $('#organization_name').attr('disabled', 'disabled');
      }
      else if(this.value == 'data_organization_type'){
        $('#organization_type').val("");
        $('#organization_type').attr('disabled', 'disabled');
      }

      prev_value = this.value;
      //else if(this.value == 'data_')

      // else if(this.value == 'data_')
    }
  }



  function setFormValidation(){
    
    $('#generate_report_form')
      .formValidation({

          framework: 'bootstrap',
          excluded: [':disabled'],
          icon: {
              validating: 'glyphicon glyphicon-refresh'
          },
          fields: {
              min_age: {
                  validators: {
                    lessThan: {
                        inclusive: true,
                        value: 'max_age',
                        message: 'Enter a valid range for Age'
                    },
                    between: {
                      min: 0,
                      max: 100,
                      message: 'Enter a valid value for the minimum age'
                    }   
                }
              },
              max_age: {
                  validators: {
                      between: {
                      min: 0,
                      max: 100,
                      message: 'Enter a valid value for the maximum age'
                    } 
                  }
              },
              
              min_batch: {
                  validators: {
                      lessThan: {
                          inclusive: true,
                          value: 'max_batch',
                          message: 'Enter a valid range for Batch'
                      },
                      between: {
                      min: 1970,
                      max: 2010,
                      message: 'Enter a valid value for the minimum batch'
                    }
                  }
              },
              max_batch: {
                  validators: {
                      between: {
                      min: 1970,
                      max: 2010,
                      message: 'Enter a valid value for the maximum batch'
                    } 
                  }
              },

              'sex_input[]': {
                validators: {
                    choice: {
                        min: 1,
                        max: 2,
                        message: 'Choose at least one.'
                    }
                }
            },


          }
      })
      .on('change', '[name="max_age"]', function() {
          if($('[name="min_age"]').val() == "" || $('[name="max_age"]').val() == "")
            $('#generate_report_form').formValidation('enableFieldValidators', 'min_age', false, 'lessThan');
          
          else{
            $('#generate_report_form').formValidation('enableFieldValidators', 'min_age', true, 'lessThan');
            $('#generate_report_form').formValidation('revalidateField', 'min_age');
          }
      })
      .on('change', '[name="min_age"]', function() {
          if($('[name="min_age"]').val() == "" || $('[name="max_age"]').val() == "")
            $('#generate_report_form').formValidation('enableFieldValidators', 'min_age', false, 'lessThan');
         
          else{
            $('#generate_report_form').formValidation('enableFieldValidators', 'min_age', true, 'lessThan');
            $('#generate_report_form').formValidation('revalidateField', 'min_age');
          }
      })
      .on('change', '[name="max_batch"]', function() {
          if($('[name="min_batch"]').val() == "" || $('[name="max_batch"]').val() == "")
            $('#generate_report_form').formValidation('enableFieldValidators', 'min_batch', false, 'lessThan');

          else{
            $('#generate_report_form').formValidation('enableFieldValidators', 'min_batch', true, 'lessThan');
            $('#generate_report_form').formValidation('revalidateField', 'min_batch');
          }
      })
      .on('change', '[class="form-control"]', function() {
        $('#disable_submit').val(Math.random);
       
        $('#generate_report_form').formValidation('revalidateField', 'disable_submit');
      })
      .on('change', '[name="min_batch"]', function() {
          if($('[name="min_batch"]').val() == "" || $('[name="max_batch"]').val() == "")
            $('#generate_report_form').formValidation('enableFieldValidators', 'min_batch', false, 'lessThan');

          else{
            $('#generate_report_form').formValidation('enableFieldValidators', 'min_batch', true, 'lessThan');
            $('#generate_report_form').formValidation('revalidateField', 'min_batch');
          }
      })
      .on('success.field.fv', function(e, data) {
        var $parent = data.element.parents('.form-group');
        $parent.removeClass('has-success');
      })
      .on('success.form.fv',  function(e) {
        e.preventDefault();
        generateReport();
        //$('#disable_submit').val(Math.random);
      })
      .on('err.field.fv', function(e, data) {
            // data.fv      --> The FormValidation instance
            // data.field   --> The field name
            // data.element --> The field element
        //    alert(data.field +"~!");


        //if(data.field == 'sex_input[]')
            // var messages = data.fv.getMessages(data.element);

            // // Remove the field messages if they're already available
            // $('#errors').find('li[data-field="' + data.field + '"]').remove();

            // // Loop over the messages
            // for (var i in messages) {
            //     // Create new 'li' element to show the message
            //     $('<li/>')
            //         .attr('data-field', data.field)
            //         .wrapInner(
            //             $('<a/>')
            //                 .attr('href', 'javascript: void(0);')
            //                 .html(messages[i])
            //                 .on('click', function(e) {
            //                     // Focus on the invalid field
            //                     data.element.focus();
            //                 })
            //         )
            //         .appendTo('#errors');
            // }

            // // Hide the default message
            // // $field.data('fv.messages') returns the default element containing the messages
            // data.element
            //     .data('fv.messages')
            //     .find('.help-block[data-fv-for="' + data.field + '"]')
            //     .hide();
        })
      .on('err.validator.fv', function(e, data) {
        data.element
            .data('fv.messages')
            .find('.help-block[data-fv-for="' + data.field + '"]').hide()
            .filter('[data-fv-validator="' + data.validator + '"]').show();
      });
  }


  function setAllOrganizationName(){
    if($('#data_main').val() != 'data_organization_name'){
      var type = $('#organization_type').val();
      $.ajax({
        type : 'post',
        dataType: 'json',
        data: {
          'type' : type
        },
        url : Drupal.settings.basePath + 'reports/organizations/name',
        beforeSend: function () {
          $('#organization_name').attr('disabled','disabled');
        },
        success : function(result) {
          $('#organization_name').html('<option value="" selected>Select name.</option>');
          $('#organization_name').removeAttr('disabled');
          for (var i=0; i<result.length; i++)
            $('#organization_name').append('<option value="'+result[i]+'">'+result[i]+'</option>');
        }
      });
    }
  }

  function setAllOrganizationType(){
    $.ajax({
      type : 'post',
      dataType: 'json',
      url : Drupal.settings.basePath + 'reports/organizations/type',
      beforeSend: function () {
        $('#organization_type').attr('disabled','disabled');
      },
      success : function(result) {
        $('#organization_type').html('<option value="" selected>Select type.</option>');
        $('#organization_type').removeAttr('disabled');
        for (var i=0; i<result.length; i++)
          $('#organization_type').append('<option value="'+result[i]+'">'+result[i]+'</option>');
      }
    });

  }

  function setCurrentOrganizationType(){
    if($('#data_main').val() != 'data_organization_type'){
      var name = $('#organization_name').val();
      if(name != ""){
        $.ajax({
          type : 'post',
          dataType: 'json',
          data: {
            'name' : name
          },
          url : Drupal.settings.basePath + 'reports/organization/type',
          beforeSend: function () {
            $('#organization_type').attr('disabled','disabled');
          },
          success : function(result) {
            $('#organization_type').removeAttr('disabled');
            $('#organization_type').val(result);
          }
        });
      }
      else $('#organization_type').val("");
    }
  }

  function exportChart(){
    var id = this.id;

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
  


  function setMainData(){
    $('.sex_input').removeAttr('disabled');
    var category = $('#data_category').val();
   // $('#data_main_div').html('<select class="form-control" disabled><option value="" selected>Select data.</option></select>');        
    //<select class="form-control col-xs-1" id="data_main" disabled>
    $('#data_main').attr('disabled', 'disabled');
    $('#data_main').html('<option value="" selected>Select data.</option>');
    if(category != ""){
      if(category == 'basic'){
        var str = '<option value="data_sex">Sex</option><option value="data_age">Age</option><option value="data_batch">Batch</option><option value="data_organization_name">Organization Name</option><option value="data_organization_type">Organization Type</option><option value="data_job_company">Company</option><option value="data_job_position">Job Position</option>';
        $('#data_main').append(str);
        $('#data_main').removeAttr('disabled');
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
            $('#data_main').append(str);
            $('#data_main').removeAttr('disabled');
          }
        });
      }
    }

  }



  function generateReport(){
    // $('#data_category').val('basic');
    // $('#data_main').val('data_sex');

    var category = $('#data_category').val();
    var main = $('#data_main').val();
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

   // alert(sex);
    $.ajax({
      type : 'post',
      dataType: 'json',
      data: {
        'category' : category,
        'main' : main,
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

    // $("#generate_button").text('yeh');
    // $("#generate_button").removeAttr('disabled');
    //    alert(":SOMETHINGGG");
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


    var chart_type = $('#data_visualization').val();
    var data = new google.visualization.DataTable();
    data.addColumn('string', values[0][0]);
    data.addColumn('number', values[0][1]);
    console.log(values[0][0]+", "+values[0][1]);

    for(i = 1; i < values.length; i++){
      data.addRow([values[i][0], values[i][1]]);
      console.log(values[i][0]+", "+values[i][1]);
    }

    var options = {
      title: values[0][2] + 'Total Number of Respondents: '+values[0][3],
      backgroundColor: {
        
        'opacity': 100
      },
    };
    

// '"options": {' +
//     '   "alternatingRowStyle": true,' +
//     '   "showRowNumber" : true' +
//     '}' +    
    
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
        options.is3D = true;
      case 'pie':
        pieSliceText = 'label';
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
  

})(jQuery);