<html>
  <head>
  </head>
 
  <body>

<div class="container-fluid">
  <div class="row">

  <?php if($user_role==3) echo '<button type="button" value="add_question_button" class="btn btn-primary btn-sm question_modal">Add Question</button> '?>
  
<!-- 
  <a href="#" class="icon">
    <span class="glyphicon glyphicon glyphicon-search"></span>
  </a>

  <button id="row_button" type="button" class="btn btn-default dropdown-toggle" aria-expanded="false">Action</button> -->

  <input type="hidden" id="question_qid">
  <input type="hidden" id="question_multiple">
  <input type="hidden" id="question_row">
  <input type="hidden" id="question_operation">

  <div class="alert alert-success fade in" id="table_alert" style="display:none;">
    <button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <div id="table_message"></div>
  </div>

  <div id="table_div">
    <table cellpadding="0" cellspacing="0" border="0" class="display" id="question_table"></table>
  </div>


  <div class="text-center" id="loading" style="display:none;">
    <br><br><br><br><img src="<?php echo drupal_get_path('module', 'question'); ?>/loading.gif">
  </div>


  <!-- View Question modal -->
  <div class="modal fade" id="question_modal" tabindex="-1" role="dialog" aria-labelledby="question_modal_label" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="question_modal_label"></h4>
        </div>
        
        <div class="modal-body">
          <div class="text-center" id="question_loading"  style="display:none;">
              <img src="<?php echo drupal_get_path('module', 'question'); ?>/loading.gif" >
          </div>

          <div id="add_question_body" class="question_modal_body" style="display:none;">     
            <form data-toggle="validator" role="form" id="add_question_form" class="question_modal_form">
              <div class="form-group">
                <label for="add_question_text" class="control-label">Question</label>
                <input type="text" class="form-control" id="add_question_text"  placeholder="Enter question" required>
                <div class="help-block with-errors"></div>
              </div>
            
              <div class="form-group">
                <label for="add_question_category" class="control-label">Category</label>
                <input type="text" pattern="^[a-zA-Z]+[\w\-\s]*$" class="form-control" id="add_question_category"  placeholder="Enter category" required>
                <div class="help-block with-errors"></div>
              </div>

              <div class="form-group">
                <label for="add_question_multiple" class="control-label">Number of Allowed Answers</label>
                <select id="add_question_multiple" class="form-control">
                  <option value="0">Single</option>
                  <option value="1">Multiple</option>
                </select>
              </div>

              <div class="form-group">
                <label for="add_question_choices" class="control-label">Possible Answers</label>
                <input type="text" pattern="^\s*\w(\s*,?\s*\w)*\s*$" class="form-control" id="add_question_choices" placeholder="(Ex. Yes, No)">
                <span class="help-block with-errors">List down choices separated by a comma.</span>
              </div>

              <div class="form-group modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" id="add_question_submit">Submit</button>
              </div>
            </form>
          </div>




          <div id="view_question_body" class="question_modal_body" style="display:none;">
            <div class="alert alert-success fade in" id="view_question_alert" style="display:none;">
              <button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <div id="view_question_message"></div>
            </div>
            <table class="table table-striped table-bordered table-condensed">
              <tbody id="question_parent">
                <tr>
                  <th>Question</th>
                    <td><a href="#" id="view_question_text" class="editable" data-type="text" ></a></td>
                </tr>
                <tr>
                  <th>Category</th>
                    <td><a href="#" id="view_question_category" class="editable" data-type="text"></a></td>
                </tr>
                <tr>
                  <th>Allowed answers</th>
                    <td><a href="#" id="view_question_multiple" class="editable" data-type="select"></a></td>
                </tr>
                <tr>
                  <th>Recommended Answers</th>
                    <td><a href="#" id="view_question_choices" class="editable" data-type="text" ></a></td>
                </tr>
                <tr>
                  <th>Your Answers</th>
                    <td>
                      <div class="text-left">
                        <a href="#" id="view_question_answers" class="editable" data-type="text" ></a>
                      </div>
                      <div class="text-right">   
                        <button type="button" class="btn btn-default btn-xs question_modal"  value="view_answer_button">
                          <div id="view_answer_label"></div>
                        </button>
                      </div>
                    </td>
                </tr>
            </tbody>
            </table>


            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="edit_question_submit">Save Changes</button>
            </div>
          </div>          



          <div id="view_answer_body" class="question_modal_body" style="display:none;">     
            <form data-toggle="validator" role="form" id="view_answer_form" class="question_modal_form">
              <div class="form-group">
                <label for="add_answer_question" class="control-label">Question</label>
                <p id="add_answer_question" class="form-control-static">This is the question.</p>
              </div>

              <div class="form-group">
                <label for="add_answer_select" class="control-label">Answer(s)</label>
                <div id="select_div" class="select_div"><select id="add_answer_select" class="form-control chosen-select" data-placeholder="Choose an answer." required></select></div>
                <div id="select_multiple_div" class="select_div"><select id="add_answer_select_mul" class="form-control chosen-select" data-placeholder="Choose your answers." multiple required></select></div>
              </div>
             <!--  <div class="form-group" id="add_answer_other_body" style="display:none;">
                <label for="add_answer_other" class="control-label">Other</label>
                <input type="text" class="form-control" id="add_answer_other" placeholder="Enter your answer.">
                <span class="help-block with-errors" id="add_answer_help"></span>
              </div> -->
              
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary submit-button" id="add_answer_submit">Submit</button>
              </div>
            </form>
          </div>



          <div id="delete_question_body" class="question_modal_body" style="display:none;">   
            <div id="delete_question_label">Delete question?</div>

            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger" id="delete_question_submit">Delete</button>
            </div>
          </div>






      </div>
    </div>
  </div>
</div>





  </body>

</html>