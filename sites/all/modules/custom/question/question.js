(function($){
  
  $(document).ready(function() {
    init_chosen();
    init_editable();  
    init_functions();
    view_list();
    $("[data-hover='tooltip']").tooltip();
  });

  function add_custom_answer(){
    if($(".chosen-select").val() == "other")
      $("#add_answer_other_body").show();
    else $("#add_answer_other_body").hide();
  }

  function reset_modal(){
    $(".question_modal_form")[0].reset();
    $('.form-group').removeClass('has-error has-feedback');
    $('.form-group').find('small.help-block').hide();
    $('.form-group').find('i.form-control-feedback').hide();
  //  $('#question_table').DataTable().ajax.reload();
 //   view_list();

   
    // var array = [23, "B", "C", "D", "E"];
    // var rowNode = $("#question_table").DataTable().row.add(array).draw().node();$(rowNode)
    // alert($(rowNode).closest('tr').index());
    ///index = $(this).closest('tr').index();
   // $(rowNode).addClass('highlight');//css( 'color', 'red' ).animate( { color: 'black' } );
    
   // $("#question_table").DataTable()
   // if(operation = "edit"){
   //     var rowNode = $("#question_table").DataTable().row.add(array).draw().node();
   // }


  }


  function show_modal(){
    var value = $(this).attr("value");
    $('#question_modal').modal('show');
    $('.question_modal_body').hide();
    $('.alert').hide();

    if(value != "add_question_button" && $(this).closest('tr').index() != -1) {    
      var table = $("#question_table").DataTable();
      var row = $(this).closest('tr').index();
      var data = table.column(1, {order:'current', page:'current'}).data();
      var indexes = table.rows().eq(0).filter( function (rowIdx) {
        return table.cell(rowIdx, 1).data() === data[row] ? true : false;
      });

     // alert(indexes[0]);
      index = indexes[0];
    }

    if(value == "add_question_button") {
      $('#question_modal_label').text("Add Question");
      $('#add_question_body').show();
    }
  
    else if(value == "view_question_button") {
      view_question(this.id);
    }
  
    else if(value == "view_answer_button") {
      view_answer(this.id);
    }
  
    else if(value == "delete_question_button") {
      $('#question_qid').val(this.id);
      confirm_delete();
    }
  }

  function init_functions(){
    $('#edit_question_submit').on('click', edit_question);
    $('#delete_question_submit').on('click', delete_question);
    $('#add_answer_submit').on('click', add_answer);

   
    $('#question_modal').on('hidden.bs.modal', reset_modal);
    $(document).on('click', '.question_modal', show_modal);

  

 
    
    // $('.chosen-select').on('change', toggle_button);
    $('#add_question_form').validator().on('submit', function (e) {
      if (e.isDefaultPrevented()) {
        alert('error');
      } else {
        e.preventDefault();
        add_question();
      }
    });



    // $('#view_answer_form').validator().on('submit', function (e) {
    //   if (e.isDefaultPrevented()) {
    //     alert('error');
    //   } else {
    //     alert('succes');
    //     e.preventDefault();
    //     add_answer();
    //   }
    // });
    // $('body').on('click', 'try', function() {
    //     alert("!");
    //     var table = $('#question_table').DataTable();
    //     alert( 'Row index: '+table.row( this ).index());
    // });

    // $('#question_table').DataTable().$('tr').find('button').click(function() {
    //   var data = $('#question_table').DataTable().fnGetData($(this).closest('tr')[0]);
    //   var id = data[0];//first cell
    //   alert(id);// $('#empID').text(id);
    // });

    // var table = $('#question_table').DataTable();
    // $("table tbody").on('click', '.select-button', function() {
    //     alert('Row index:' + $(this).closest('tr').prevAll().length );
    // });  

    $("#question_table tbody").on('click', '.select-button', function() {
    //    alert('Row index: ' + $(this).closest('tr').index());
    });

    $('#add_answer_submit').attr('disabled','disabled');
    $('.chosen-select').on('change', function() {
      if($(this).val() != '') {
        $('#add_answer_submit').removeAttr('disabled');
      }
      else{
        $('#add_answer_submit').attr('disabled','disabled');
      }
    });
  
    index = -1;
  }


  function init_chosen(){
    var select = $(".chosen-select");

    select.chosen({
      disable_search_threshold: 10,
      no_results_text: 'Press enter to add:',
      width: "95%"
    });

    var chosen = $('.chosen-container');
    chosen.find('input').keyup( function(e) {
      if (e.which == 13 && chosen.find('li.no-results').length > 0){
        var option = $("<option>").val(this.value).text(this.value);
        select.append(option);
        select.find(option).prop('selected', true);
        select.trigger("chosen:updated");
      }
    });
  }


  function init_editable(){
    $.fn.editable.defaults.mode = 'inline';

    $('#view_question_text').editable({
      validate:function(value){         
        if(value == "") return 'Please insert valid input.';
      },
      success: function(response, newValue) {
        $("#edit_question_submit").removeAttr('disabled');
        question_text = newValue.trim();
      }
    });

    $('#view_question_category').editable({
      validate:function(value){
      //  var v=valib.String.isEmailLike(value)         
        if(!(value.match(/^[a-zA-Z]+[\w\-\s]*$/)))
          return 'Please insert valid input.';
      },
      success: function(response, newValue) {
        $("#edit_question_submit").removeAttr('disabled');
        question_category = newValue.trim();
      }
    });

    $("#view_question_multiple").editable({
      source: [
        {value: 0, text: "Single"},
        {value: 1, text: "Multiple"},
      ],
      success: function(response, newValue) {
        $("#edit_question_submit").removeAttr('disabled');
        question_multiple = newValue.trim();
      }
    });



    $('#view_question_choices').editable({
      validate:function(value){
        if(!(value.match(/^\s*\w(\s*,?\s*\w)*\s*$/)))
          return 'Please insert valid input.  ';
      },
      success: function(response, newValue) {
        $("#edit_question_submit").removeAttr('disabled');
        question_choices = newValue.trim();
        //alert(question_choices+"~");
      }
    }); 

     $('#view_question_answers').editable();
     $('#view_question_answers').editable('toggleDisabled');
  }


  function add_answer(){
    var qid = $('#question_qid').val(), answers;
    //alert("ADD ANSWER: "+qid);
    if($('#question_multiple').val() == 1)
      answers = $("#add_answer_select_mul").val();
    else
      answers = $("#add_answer_select").val();

   // alert("~"+answers+"~~");

    if(answers == null) answers = [];
    // alert("ADD ANSWER: "+qid);
    // alert("ANSWERS: "+answers);
    $.ajax({
      type : 'post',
      dataType: 'json',
      url : Drupal.settings.basePath + 'questions/add/answer',
      data: {
        'qid' : qid,
        'answers' : answers,
      },
      beforeSend: function () {
        $('#question_modal').data('bs.modal').isShown = false;
        $('#question_modal_label').text("Loading..");
        $('.question_modal_body').hide();
        $('#question_loading').show();
      },
      success : function(data) {
        $('#question_loading').hide();
        $('#view_question_message').html("Your answer has been successfully added.");
        $('#view_question_alert').show();
        $('#question_operation').val("edit");
        view_question(qid);
      }
    });
  }

  function view_answer(qid){
    if(qid == '')  qid = $('#question_qid').val();
    $.ajax({
      type : 'post',
      dataType: 'json',
      url : Drupal.settings.basePath + 'questions/view',
      data: {
        'qid' : qid
      },
      beforeSend: function () {
        $('#question_modal').data('bs.modal').isShown = false;
        $('#question_modal_label').text("Loading..");
        $('.select_div').hide();
        $('#question_loading').show();
      },
      
      success : function(data) {
        $("#add_answer_question").text(data.text);
        $('.chosen-select').html('');

        if(data.answers.length == 0)  $('#question_modal_label').text("Add Answer");
        else                          $('#question_modal_label').text("Edit Answer");
        
        if(data.multiple == 0){
          $('.chosen-select').append('<option></option>');
          $('#select_div').show(); 
        }
        else $('#select_multiple_div').show();

        $.each(data.choices, function (i, choice) {
          if(data.answers.indexOf(choice) != -1)  attr = 'selected';
          else attr = '';
          $('.chosen-select').append('<option value="'+choice+'" '+attr+'>'+choice+'</option>');
        });

        $('.chosen-select').trigger("chosen:updated");
        $('#question_multiple').val(data.multiple);
        $('#question_modal').data('bs.modal').isShown = true;
        $('#question_loading').hide();
        $('#view_answer_body').show();
      }
    });

    $('#question_qid').val(qid);
  }


  function add_question(){
    var text = $('#add_question_text').val();
    var category = $('#add_question_category').val();
    var multiple = $('#add_question_multiple').val();
    var choices = $('#add_question_choices').val();

    $.ajax({
      type : 'post',
      dataType: 'json',
      url : Drupal.settings.basePath + 'questions/add',
      data: {
        'text' : text,
        'category' : category,
        'multiple' : multiple,
        'choices' : choices,
      },
      beforeSend: function () {
        $('#question_modal').data('bs.modal').isShown = false;
        $('#question_modal_label').text("Loading..");
        $('.question_modal_body').hide();
        $('#question_loading').show();
      },
      success : function(data) {
        $('#question_loading').hide();
        $('#view_question_message').html("Question has been successfully added.");
        $('#view_question_alert').show();
        $('#question_operation').val("add");
        view_question(data);
      }
    });

  }

  function edit_question(){
    var qid = $('#question_qid').val();
   
    $.ajax({
      type : 'post',
      dataType: 'json',
      url : Drupal.settings.basePath + 'questions/edit',
      data: {
        'qid': qid,
        'text': question_text,
        'category': question_category,
        'multiple': question_multiple,
        'choices': question_choices
      },
      beforeSend: function () {
        $('#question_modal').data('bs.modal').isShown = false;
        $('#question_modal_label').text("Loading..");
        $('.question_modal_body').hide();
        $('#question_loading').show();
      },
      success : function(data) {
        $('#question_loading').hide();
        $('#view_question_message').html("Question has been successfully edited.");
        $('#view_question_alert').show();
        $('#question_operation').val("edit");
        view_question(qid);
      }
    });
  }

  function delete_question(){
    var qid = $('#question_qid').val();
   
    $.ajax({
      type : 'post',
      dataType: 'json',
      url : Drupal.settings.basePath + 'questions/delete',
      data: {
        'qid': qid
      },
      beforeSend: function () {
        $('#question_modal').data('bs.modal').isShown = false;
        $('#question_modal_label').text("Loading..");
        $('.question_modal_body').hide();
        $('#question_loading').show();
      },
      success : function(data) {
        $('#question_loading').hide();
        $('#question_modal').modal('hide');
    //    $("#question_table").DataTable().row(index).remove().draw();
        $('#table_message').html("Question has been successfully deleted.");
        $('#table_alert').show();
      }
    });
   
    $("#question_table").DataTable().row(index).remove().draw();
    
  }


function view_question(qid){
    $("#edit_question_submit").attr('disabled','disabled');
    $(".editable").removeClass('editable-unsaved');
    var operation = $('#question_operation').val();

    $.ajax({
      type : 'post',
      dataType: 'json',
      url : Drupal.settings.basePath + 'questions/view',
      data: {
        'qid' : qid
      },
      beforeSend: function () {
        $('#question_modal').data('bs.modal').isShown = false;
        $('#question_modal_label').text("Loading..");
        $('#question_loading').show();
      },
      success : function(data) {
        $('#question_modal').data('bs.modal').isShown = true;
        $('#question_modal_label').text("View Question");
        $('#view_question_text').text(data.text);
        $('#view_question_text').editable('setValue', data.text);
        $('#view_question_category').text(data.category);
        $('#view_question_category').editable('setValue', data.category);
        $('#view_question_multiple').editable('setValue', data.multiple);
        $('#view_question_choices').text(data.choices.join(", "));
        $('#view_question_choices').editable('setValue', data.choices.join(", "));
        $('#view_question_answers').text(data.answers.join(", "));
        $('#view_question_answers').editable('setValue', data.answers.join(", "));
        
        question_text = data.text;
        question_category = data.category;
        question_multiple = data.multiple;
        question_choices = data.choices.join(", ");
        question_answers = data.answers.join(", ");

        if(data.role != 3)            $('.editable').editable('toggleDisabled');
        if(data.answers.length == 0)  $('#view_answer_label').html('<span class="glyphicon glyphicon-pencil"></span> Add Answer');
        else                          $('#view_answer_label').html('<span class="glyphicon glyphicon-pencil"></span> Edit Answer');
        
        if(operation != ""){
          if(data.answers.length == 0){
            icon = "plus";
            answer_op = "add";
          }  
          else{
            icon = "pencil";
            answer_op = "edit";
          }
          
          var actions = '<span class="hidden">'+answer_op+'</span><button type="button" id="'+qid+'" class="btn btn-sm btn-primary question_modal" value="view_question_button"><span class="glyphicon glyphicon-open"></span></button> <button type="button" id="'+qid+'" class="btn btn-sm btn-info question_modal" value="view_answer_button"><span class="glyphicon glyphicon-'+icon+'"></span></button>';
          if(data.role == 3)  actions += ' <button type="button" id="'+qid+'" class="btn btn-sm btn-danger question_modal" value="delete_question_button"><span class="glyphicon glyphicon-trash"></span></button>';
  
          var array = [qid, data.text, data.category, data.multiple, actions];
          var table = $("#question_table").DataTable();
          if(operation == "add"){
            var rowNode = $("#question_table").DataTable().row.add(array).draw().node();
            var row = $(rowNode).index();
            var data = table.column(1, {order:'current', page:'current'}).data();
            var indexes = table.rows().eq(0).filter( function (rowIdx) {
              return table.cell(rowIdx, 1).data() === data[row] ? true : false;
            });

           // alert(indexes[0]);
            index = indexes[0];
          }
          else if(operation == "edit"){
            table.row(index).data(array).draw();
          }
        }

        $('#question_operation').val("");
        $('#question_qid').val(qid);
        $('#question_loading').hide();
        $('#view_question_body').show();
      }

    });
  }

  function confirm_delete(){
    var qid = $('#question_qid').val();
    
    $.ajax({
      type : 'post',
      dataType: 'json',
      url : Drupal.settings.basePath + 'questions/view',
      data: {
        'qid' : qid
      },
      beforeSend: function () {
        $('#question_modal').data('bs.modal').isShown = false;
        $('#question_modal_label').text("Loading..");
        $('#question_loading').show();
      },
      success : function(data) {
        $('#question_modal').data('bs.modal').isShown = true;
        $('#question_modal_label').text("Confirm Deletion");
        $('#delete_question_label').html('Question to be deleted: "'+data.text+'"');
        $('#question_loading').hide();
        $('#delete_question_body').show();
      }
    });
    
  }


  function view_list(){

    $.ajax({
      type : 'post',
      dataType: 'json',
      url : Drupal.settings.basePath + 'questions/list',
      beforeSend: function () {
        $('#loading').show();
      },
      success : function(data) {
        $('#loading').hide();
        $('#question_table').DataTable( {
          "data": data,
          "columns": [
              { "title": "QID" },
              { "title": "Question" },
              { "title": "Category"},
              { "title": "Multiple"},
              { "title": "Actions"},
          ],
       //   "dom": '<"toolbar">frtip'
         // "bAutoWidth": false,
        });

     //   $("div.toolbar").append('<b>Custom tool bar! Text/images etc.</b>');
      }

    });
  }

})(jQuery);