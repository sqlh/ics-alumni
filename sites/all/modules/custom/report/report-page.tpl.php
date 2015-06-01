<body>
<div class="container-fluid">
    <div class="row">
        <div class="col-xs-3 col-md-3">
            <form class="form-horizontal" role="form" id="generate_report_form">

            <div class="panel-group" id="accordion">
                
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <span class="glyphicon glyphicon-list-alt"></span>
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">Data</a>
                        </h4>
                    </div>
                    <div id="collapseOne" class="panel-collapse collapse in">
                        <div class="panel-body">
                            <div class="form-group form-group-sm">
                             <label class="control-label col-md-3" for="data_category"><small>Category</small></label>
                              <div class="col-md-9 col-md-offset-1">
                                <select id="data_category" class="form-control">
                                  <option value="" selected>Select category.</option>
                                  <option value="career">Careers</option>
                                  <option value="undergraduate">Undergraduate Data</option>
                                  <option value="personal">Personal</option>
                                  <option value="basic">Basic Information</option>
                                </select>
                              </div>
                            </div>
                            <div class="form-group form-group-sm">
                              <label class="control-label col-md-3" for="data_main"><small>Data</small></label>
                              <div class="col-md-9 col-md-offset-1">
                                <select class="form-control" id="data_main" disabled>
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
                            
                            <div class="form-group form-group-sm">
                              <label class="control-label col-md-3" for="sex_input"><small>Sex</small></label>  
                               <div class="col-md-9">
                                <div class="col-md-offset-2">
                                  <label class="checkbox-inline">
                                    <input type="checkbox" class="sex_input user_filter" name="sex_input[]" value="0" checked> Male
                                  </label>
                                </div>
                                <div class="col-md-offset-7">
                                  <label class="checkbox-inline">
                                    <input type="checkbox" class="sex_input user_filter" name="sex_input[]" value="1" checked> Female
                                  </label>
                                </div>
                              </div>
                              
                            </div>

                            <div class="form-group form-group-sm">
                              <label class="control-label col-md-3" for="min_age"><small>Age</small></label>
                              <div class="col-md-9 col-md-offset-1">
                                <div class="input-group">
                                    <input type="number" class="form-control user_filter" id="min_age" name="min_age" data-toggle="tooltip" data-placement="left" title="Leaving"/> 
                                    <span class="input-group-addon">-</span>
                                    <input type="number" class="form-control user_filter" id="max_age" name="max_age"/>
                                </div>
                              </div>

                            </div>

                            <div class="form-group form-group-sm">
                              <label class="control-label col-md-3" for="min_batch"><small>Batch</small></label>
                              <div class="col-md-9 col-md-offset-1">
                                <div class="input-group">
                                    <input type="number" class="form-control user_filter" id="min_batch" name="min_batch" min="1970"/> 
                                    <span class="input-group-addon">-</span>
                                    <input type="number" class="form-control user_filter" id="max_batch" name="max_batch" min="1970"/>
                                </div>
                              </div>
                            </div>

                            <div class="form-group form-group-sm">
                              <label class="control-label col-md-3" for="user_location"><small>Location</small></label>
                              <div class="col-md-9 col-md-offset-1">
                                <select id="user_location" class="form-control user_filter" disabled>
                                  <option>--</option>
                                </select>
                              </div>
                            </div>

                            <div class="form-group form-group-sm">
                              <label class="control-label col-md-3" for="organization_name"><small>Org Name</small></label>
                              <div class="col-md-9 col-md-offset-1">
                                  <select id="organization_name" class="form-control" >
                                    <option value="" selected>Select name.</option>
                                  </select>
                              </div>
                            </div>

                            <div class="form-group form-group-sm">
                              <label class="control-label col-md-3" for="organization_type"><small>Org Type</small></label>
                              <div class="col-md-9 col-md-offset-1">
                                  <select id="organization_type" class="form-control">
                                    <option value="" selected>Select type.</option>
                                  </select>
                              </div>
                            </div>

                            <!-- <div class="form-group form-group-sm">
                              <label class="control-label col-md-3" for="job_company"><small>Job Company</small></label>
                              <div class="col-md-9 col-md-offset-1">
                                  <select id="job_company" class="form-control">
                                    <option value="" selected>Select company.</option>
                                  </select>
                              </div>
                            </div>

                            <div class="form-group form-group-sm">
                              <label class="control-label col-md-3" for="job_position"><small>Job Position</small></label>
                              <div class="col-md-9 col-md-offset-1">
                                  <select id="job_position" class="form-control">
                                    <option value="" selected>Select position.</option>
                                  </select>
                              </div>
                            </div> -->

                        
                            <div class="form-group form-group-sm">
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
                        <div class="form-group form-group-sm">
                         <label class="control-label col-md-3" for="data_visualization"><small>Graph</small></label>
                          <div class="col-md-9 col-md-offset-1">
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

                        <div class="form-group form-group-sm">
                         <label class="control-label col-md-3 col-md-4" for="data_visualization"><small>Results</small></label>
                          <div class="col-md-9 col-md-offset-1">
                            <input type="number" class="form-control" id="results_number" name="results_number" value="10" min="1" max="20"/>
                            <span class="help-block">Number of top results to be displayed.</span>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                </div>


            </div>

            <div class="form-group form-group-sm">
              <input type="hidden" id="disable_submit" name="disable_submit" class="form-control" max="2"></input>
            </div>

            <div class="col-md-offset-2">
            <button type="submit" class="btn btn-default" id="generate_button">Generate</button>
             </div>
            </form>
        </div>

        

        <div class="col-sm-9 col-md-9">
            <!-- <div class="well"> -->
            <div class="text-center" id="chart_loading" style="display:none; width: 800px; height: 400px;">
              <br><br><br><br><br><br><img src="<?php echo drupal_get_path('module', 'report'); ?>/loading.gif">
            </div>
            
            <div id='visualization_div' style="width: 800px; height: 400px;">
            </div>   
            <div id='uri_div' style="width: 800px; height: 400px; display:none;">
            </div> 

            

            <div class="col-md-offset-4">
              <button type="button" id="pdf_button" class="btn btn-export btn-default btn-sm">PDF Document</button></br>
              <button type="button" id="image_button" class="btn btn-export btn-default btn-sm">Image</button></br>
              <button type="button" id="csv_button" class="btn btn-export btn-default btn-sm">CSV File</button></br>
            </div>

            <div class="dropdown col-sm-offset-4">
              <button class="btn btn-default dropdown-toggle" type="button" id="export_dropdown" data-toggle="dropdown" aria-expanded="true">
                Export
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu" role="menu" aria-labelledby="export_dropdown">
                <li role="presentation"><a role="menuitem" tabindex="-1">PDF Document</a></li>
                <li role="presentation"><a role="menuitem" tabindex="-1">Image</a></li>
                <li role="presentation"><a role="menuitem" tabindex="-1">CSV File</a></li>
              </ul>
            </div>
            
        </div>


        <form method='post' action='<?php echo drupal_get_path('module', 'report');?>/saveChartPDF.php' id='savePDFForm'>
          <input type='hidden' id='htmlContentHidden' name='htmlContent' value=''>
        </form>

    </div>
</div>


        

        
</body>
       