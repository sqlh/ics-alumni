<div class="container-fluid">
    <div class="row">
        <div class="col-xs-4 col-md-4">
            <form class="form-horizontal" role="form" id="generate_report_form">

            <div class="panel-group" id="accordion">
                
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <span class="glyphicon glyphicon-list-alt"></span>
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">Data</a>
                        </h4>
                    </div>
                    <div id="collapseOne" class="panel-collapse collapse">
                        <div class="panel-body">
                            <div class="form-group">
                             <label class="control-label col-xs-3" for="data_category">Category:</label>
                              <div class="col-xs-9">
                                <select id="data_category" class="form-control">
                                  <option value="" selected>Select category.</option>
                                  <option value="career">Careers</option>
                                  <option value="undergraduate">Undergraduate Data</option>
                                  <option value="personal">Personal</option>
                                  <option value="basic">Basic Information</option>
                                </select>
                              </div>
                            </div>
                            <div class="form-group">
                              <label class="control-label col-xs-3" for="data_main">Main Data:</label>
                              <div class="col-xs-9" id="data_main_div"> 
                                <select class="form-control col-xs-1" id="data_main" disabled>
                                  <option value="" selected>Select data.</option>
                                </select>
                              </div>
                            </div>





                        </div>


                    </div>

                </div>


                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <span class="glyphicon glyphicon-user"></span>
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">Users</a>
                        </h4>
                    </div>
                    <div id="collapseTwo" class="panel-collapse collapse in">
                        <div class="panel-body">
                            <div class="form-group">
                              <label class="control-label col-xs-4" for="sex_input">Sex:</label>
                              <div class="col-xs-8">
                                <label class="checkbox-inline"><input type="checkbox" class="sex_input user_filter" name="sex_input" value="0">Male</label>
                                <label class="checkbox-inline"><input type="checkbox" class="sex_input user_filter" name="sex_input" value="1">Female</label>    

                              </div>
                            </div>

                            <div class="form-group">
                              <label class="control-label col-xs-4" for="min_age">Age:</label>
                              <div class="col-xs-8">
                                <div class="input-group">
                                    <input type="number" class="form-control user_filter" id="min_age" name="min_age" data-toggle="tooltip" data-placement="left" title="Leaving"/> 
                                    <span class="input-group-addon">-</span>
                                    <input type="number" class="form-control user_filter" id="max_age" name="max_age"/>
                                </div>
                                <div class="messageContainer">
                                  <span class="help-block">Enter a valid Email address.</span>
                                </div>
                              </div>

                            </div>

                            <div class="form-group">
                              <label class="control-label col-xs-4" for="min_batch">Batch:</label>
                              <div class="col-xs-8">
                                <div class="input-group">
                                    <input type="number" class="form-control user_filter" id="min_batch" name="min_batch" min="1970"/> 
                                    <span class="input-group-addon">-</span>
                                    <input type="number" class="form-control user_filter" id="max_batch" name="max_batch" min="1970"/>
                                </div>
                              </div>
                            </div>

                            <div class="form-group">
                              <label class="control-label col-xs-4" for="user_location">Location:</label>
                              <div class="col-xs-8">
                                <select id="user_location" class="form-control user_filter" disabled>
                                  <option>--</option>
                                </select>
                              </div>
                            </div>

                            <div class="form-group">
                              <label class="control-label col-xs-4" for="organization_name">Org Name:</label>
                              <div class="col-xs-8">
                                  <select id="organization_name" class="form-control user_filter" >
                                    <option value="" selected>Select name</option>
                                  </select>
                              </div>
                            </div>

                            <div class="form-group">
                              <label class="control-label col-xs-3" for="organization_type">Org Type:</label>
                              <div class="col-xs-8">
                                  <select id="organization_type" class="form-control user_filter">
                                    <option value="" selected>--</option>
                                    <option value="academic">Academic</option>
                                    <option value="cultural">Cultural</option>
                                    <option value="fraternity">Fraternity</option>
                                    <option value="political">Political</option>
                                    <option value="religious">Religious</option>
                                    <option value="socio">Socio-Civic</option>
                                    <option value="sorority">Sorority</option>
                                    <option value="sports">Sports and Recreational</option>
                                    <option value="varsitarian">Varsitarian</option>
                                  </select>
                              </div>
                            </div>

                        
                            <div class="form-group">
                              <button type="button" class="btn btn-default btn-xs" id="reset_button">Reset fields</button>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <span class="glyphicon glyphicon-stats"></span>
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">Visualization</a>
                        </h4>
                    </div>
                    <div id="collapseThree" class="panel-collapse collapse">
                      <div class="panel-body">
                        <div class="form-group">
                         <label class="control-label col-xs-3" for="data_visualization">Graph:</label>
                          <div class="col-xs-8">
                            <select id="data_visualization" class="form-control">
                              <option value="" selected disabled>Select report type.</option>
                              <option value="pie_3d">3D Pie Chart</option>
                              <option value="bar">Bar Graph</option>
                              <option value="bubble">Bubble Chart</option>
                              <option value="combo">Combo</option>
                              <option value="histogram">Histogram</option>
                              <option value="line">Line Chart</option>
                              <option value="pie">Pie Chart</option>
                              <option value="table">Table</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>


            </div>


            <button type="submit" class="btn btn-primary" id="add_question_submit">Submit</button>

            </form>
        </div>
        <div class="col-sm-8 col-md-8">
            <div class="well">
                <h1>
                    Accordion Menu With Icon</h1>
                Admin Dashboard Accordion Menu
            </div>
        </div>

        <form id="profileForm" class="form-horizontal">
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email address</label>
                                    <div class="col-xs-5">
                                        <input type="text" class="form-control emailAddress" name="primary_email" />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="col-xs-5 col-xs-offset-3">
                                        <input type="text" class="form-control emailAddress" name="secondary_email" />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="col-xs-9 col-xs-offset-3">
                                        <button type="submit" class="btn btn-default">Validate</button>
                                    </div>
                                </div>
                            </form>

    </div>
</div>