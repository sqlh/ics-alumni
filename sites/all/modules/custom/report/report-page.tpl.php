<html>
  <head> 
  </head>
  <body>
  

<div class="container-fluid">
  <div class="row">
      <div class="col-xs-4">
        <div class="bs-example">
          <div class="panel-group" id="accordion">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a class="panel-toggle" data-toggle="collapse" href="#collapseOne">Data</a>
                    </h4>
                </div>
                <div id="collapseOne" class="panel-collapse collapse in">
                  <div class="panel-body">
                    
                    <form class="form-horizontal"> 
                      <div class="form-group">
                        <label class="col-xs-3 col-sm-offset-1 control-label">Category</label>
                        <div class="col-xs-7 col-sm-offset-1">
                          <select id="data_category" class="form-control">
                            <option value="" selected disabled>Select category.</option>
                            <option value="career">Careers</option>
                            <option value="undergraduate">Undergraduate Data</option>
                            <option value="personal">Personal</option>
                            <option value="basic">Basic Information</option>
                          </select>
                        </div>

                        <div id="data_main_loading"  style="display:none;">
                            <img src="<?php echo drupal_get_path('module', 'report'); ?>/loading.gif" >
                        </div>
                      </div>

               
                      <div class="form-group">
                        <label class="col-xs-3 col-sm-offset-1 control-label">Main Data</label>
                        <div id="data_main_div" class="col-xs-7 col-sm-offset-1">
                          <select id="data_main" class="form-control" disabled>
                            <option>--</option>
                          </select>
                        </div>
                      </div>

                    </form>

                  </div>
                </div>
            </div>

            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a class="panel-toggle" data-toggle="collapse" href="#collapseTwo">Users</a>
                    </h4>
                </div>
              
                <div id="collapseTwo" class="panel-collapse collapse">
                    
                        <div class="panel-body">

                            <form id="users_form" class="form-horizontal">
                                <div class="form-group">
                                  <label for="sex" class="col-xs-3 col-sm-offset-1 control-label">Sex</label>
                                  <div class="col-xs-7 col-sm-offset-1">
                                      <input type="checkbox" class="sex_input" value="0" checked> Male
                                      <input type="checkbox" class="sex_input" value="1" checked> Female
                                    </label>
                                  </div>
                                </div>

                                <div class="form-group">
                                  <label class="col-xs-3 col-sm-offset-1 control-label">Age</label>
                                  <div class="col-xs-7 col-sm-offset-1">
                                    <div class="input-group">
                                        <input type="number" class="form-control" id="min_age" min="0"/> 
                                        <span class="input-group-addon">-</span>
                                        <input type="number" class="form-control" id="max_age" min="0"/>
                                    </div>
                                  </div>
                                </div>

                                <div class="form-group">
                                  <label class="col-xs-3 col-sm-offset-1 control-label">Batch</label>
                                  <div class="col-xs-7 col-sm-offset-1">
                                    <div class="input-group">
                                        <input type="number" class="form-control" id="min_batch" /> 
                                        <span class="input-group-addon">-</span>
                                        <input type="number" class="form-control" id="max_batch" />
                                    </div>
                                  </div>
                                </div>

                                <div class="form-group">
                                  <label class="col-xs-3 col-sm-offset-1 control-label">Location</label>
                                  <div class="col-xs-7 col-sm-offset-1">
                                    <select id="user_location" class="form-control" disabled>
                                      <option>--</option>
                                    </select>
                                  </div>
                                </div>

                                <div class="form-group">
                                  <label class="col-xs-3 col-sm-offset-1 control-label">Organization Name</label>
                                  <div class="col-xs-7 col-sm-offset-1">
                                    <select id="organization_name" class="form-control" >
                                      <option value="" selected disabled>Select organization.</option>
                                    </select>
                                  </div>
                                </div>
                                
                                <div class="form-group">
                                  <label class="col-xs-3 col-sm-offset-1 control-label">Organization Type</label>
                                  <div class="col-xs-7 col-sm-offset-1">
                                    <select id="organization_type" class="form-control">
                                      <option value="" selected disabled>Select type.</option>
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
                            </form>

                        </div>
                </div>
            </div>

            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a class="panel-toggle" data-toggle="collapse" href="#collapseThree">Visualization</a>
                    </h4>
                </div>
                <div id="collapseThree" class="panel-collapse collapse">
                    <div class="panel-body">
                        <form class="form-horizontal"> 
                          <div class="form-group">
                            <label class="col-xs-3 col-sm-offset-1 control-label">Graph</label>
                            <div class="col-xs-7 col-sm-offset-1">
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
                        </form>
                    </div>
                </div>
            </div>

          </div>
        </div><br>

        <div class="form-group">
          <div class="col-sm-offset-4 col-sm-10">
            <button type="button" class="btn btn-default" id="generate_button">Generate</button>
          </div>
        </div><br><br>

      </div>
      
      <div class="col-sm-8">
          <div class="text-center" id="chart_loading" style="display:none; width: 800px; height: 400px;">
            <br><br><br><br><br><br><img src="<?php echo drupal_get_path('module', 'report'); ?>/loading.gif">
          </div>
          
          <div id='visualization_div' style="width: 900px; height: 400px;">
          </div>   
          <div id='uri_div' style="width: 900px; height: 400px; display:none;">
          </div> 

          
      </div>
    </div>

    <div class="dropdown text-center col-sm-offset-5" style="display:none;">
      <button class="btn btn-default dropdown-toggle" type="button" id="export_dropdown" data-toggle="dropdown" aria-expanded="true">
        Export
        <span class="caret"></span>
      </button>
      <ul class="dropdown-menu" role="menu" aria-labelledby="export_dropdown">
        <li role="presentation" id="pdf_button" class="btn-export"><a role="menuitem" tabindex="-1">PDF Document</a></li>
        <li role="presentation" id="image_button" class="btn-export"><a role="menuitem" tabindex="-1">Image</a></li>
        <li role="presentation" id="csv_button" class="btn-export"><a role="menuitem" tabindex="-1">CSV File</a></li>
      </ul>
    </div>

    <form method='post' action='<?php echo drupal_get_path('module', 'report');?>/saveChartPDF.php' id='savePDFForm'>
      <input type='hidden' id='htmlContentHidden' name='htmlContent' value=''>
    </form>

  </div>
  </body>
</html>

              <!--   <button type='button' id="pdf_button" class="btn btn-default btn-export"><span class="glyphicon glyphicon-file"></span>PDF Document</button>
                <button type='button' id="image_button" class="btn btn-default btn-export"><span class="glyphicon glyphicon-picture"></span>Image</button>
                <button type='button' id="csv_button" class="btn btn-default btn-export"><span class="glyphicon glyphicon-list-all"></span>CSV File</button> -->