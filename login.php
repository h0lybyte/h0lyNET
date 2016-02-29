<?php
define('IPBWI_LOGIN_REMEMBER',true);
require_once('/var/www/c/ipbwi/ipbwi.inc.php');

if($ipbwi->member->isLoggedIn()){
header("Location: https://kbve.com/");
die();
}

if(isset($_POST['action']) && $_POST['action'] == 'login'){
		if(empty($_POST['username'])){
			$ipbwi->addSystemMessage('Error', 'You have to type an username.');
		}elseif(empty($_POST['password'])){
			$ipbwi->addSystemMessage('Error', 'You have to type a password.');
		}else{
			if(isset($_POST['setcookie'])){
				$setCookie	= true;
			}else{
				$setCookie	= false;
			}
			if(isset($_POST['anonlogin'])){
				$anonLogin	= true;
			}else{
				$anonLogin	= false;
			}
			if($ipbwi->member->login($_POST['username'],$_POST['password'],$setCookie,$anonLogin))
				{
				header("Location: https://kbve.com/");
				die();
				}
			
		}
	}

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="Dashboard">
    <meta name="keyword" content="Dashboard, Bootstrap, Admin, Template, Theme, Responsive, Fluid, Retina">

    <title>KBVE - Official Login</title>

    <!-- Bootstrap core CSS -->
    <link href="https://kbve.com/assets/dash/css/bootstrap.css" rel="stylesheet">
    <!--external css-->
    <link href="https://kbve.com/assets/dash/font-awesome/css/font-awesome.css" rel="stylesheet" />
        
    <!-- Custom styles for this template -->
    <link href="https://kbve.com/assets/dash/css/style.css" rel="stylesheet">
    <link href="https://kbve.com/assets/dash/css/style-responsive.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

      <!-- **********************************************************************************************************************************************************
      MAIN CONTENT
      *********************************************************************************************************************************************************** -->

	  <div id="login-page">
	  	<div class="container">
	  	
		      <form class="form-login" action="login.php" method="post">
		        <h2 class="form-login-heading">sign in now</h2>
				<br />
				<?php 
				echo $ipbwi->printSystemMessages();
				?>
		        <div class="login-wrap">
					<input type="hidden" name="action" value="login" />
		            <input type="text" class="form-control" name="username" placeholder="User ID" autofocus>
		            <br>
		            <input type="password" class="form-control" name="password" placeholder="Password">
		            <label class="checkbox">
		                <span class="pull-right">
		                  <!--  <a data-toggle="modal" href="login.html#myModal"> Forgot Password?</a>
							!-->
							<a href="https://kbve.com/c/index.php?app=core&module=global&section=lostpass" /target="_blank"> Forgot Password?</a>
		                </span>
		            </label>
		            <button class="btn btn-theme btn-block" href="index.html" type="submit"><i class="fa fa-lock"></i> SIGN IN</button>
		            <hr>
		            
		            <div class="login-social-link centered">
		            <p>or you can sign in via your social network</p>
		                <ul class='ipsList_data clear ipsType_small'>
						
						
							<li><a class="btn btn-theme btn-block" href="https://kbve.com/c/index.php?app=core&amp;module=global&amp;section=login&amp;serviceClick=twitter" class='ipsButton_secondary fixed_width'><img src="https://kbve.com/c/public/style_images/KBVE/loginmethods/twitter.png" alt="Twitter" /> &nbsp; Sign In with Twitter</a>
							</li>
						
						
							<li><a class="btn btn-theme btn-block" href='https://kbve.com/c/index.php?app=core&amp;module=global&amp;section=login&amp;do=process&amp;use_live=1&amp;auth_key=880ea6a14ea49e853634fbdc5015a024' title='Use Windows Live'><img src="https://kbve.com/c/public/style_images/KBVE/loginmethods/windows.png" alt="Windows Live" /> &nbsp; Sign In with Windows Live</a>
							</li>
							
							<li><a class="btn btn-theme btn-block" href="https://kbve.com/c/index.php?app=core&amp;module=global&amp;section=login&amp;do=process&amp;use_steam=1&amp;auth_key=880ea6a14ea49e853634fbdc5015a024" class="ipsButton_secondary fixed_width"><img src="https://kbve.com/c/public//style_extra/signin/login-steam-icon.png" alt="Steam"> &nbsp; Sign In with Steam </a>
							</li>
							
							<li><a class="btn btn-theme btn-block" href='https://kbve.com/c/index.php?app=core&amp;module=global&amp;section=login&amp;do=process&amp;use_google=1&amp;auth_key=880ea6a14ea49e853634fbdc5015a024'  id='googleButton'><img src='https://kbve.com/c/public/style_extra/signin/login-google-icon.png' alt='Google' /> &nbsp; Sign In with Google</a>
							</li>
						
					</ul>
		            </div>
		            <div class="registration">
		                Don't have an account yet?<br/>
		                <a class="" href="https://kbve.com/c/index.php?app=core&module=global&section=register">
		                    Create an account
		                </a>
		            </div>
					
		        </div>
		
		          <!-- Modal -->
		          <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="myModal" class="modal fade">
		              <div class="modal-dialog">
		                  <div class="modal-content">
		                      <div class="modal-header">
		                          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		                          <h4 class="modal-title">Forgot Password ?</h4>
		                      </div>
		                      <div class="modal-body">
		                          <p>Enter your e-mail address below to reset your password.</p>
		                          <input type="text" name="email" placeholder="Email" autocomplete="off" class="form-control placeholder-no-fix">
		
		                      </div>
		                      <div class="modal-footer">
		                          <button data-dismiss="modal" class="btn btn-default" type="button">Cancel</button>
		                          <button class="btn btn-theme" type="button">Submit</button>
								  
		                      </div>
		                  </div>
		              </div>
		          </div>
		          <!-- modal -->
		
		      </form>	  	
	  	
	  	</div>
	  </div>

    <!-- js placed at the end of the document so the pages load faster -->
    <script src="https://kbve.com/assets/dash/js/jquery.js"></script>
    <script src="https://kbve.com/assets/dash/js/bootstrap.min.js"></script>

    <!--BACKSTRETCH-->
    <!-- You can use an image of whatever size. This script will stretch to fit in any screen size.
	<script type="text/javascript" src="https://kbve.com/assets/dash/js/jquery.backstretch.min.js"></script>
			<script>
				$.backstretch("https://kbve.com/assets/dash/img/wallpaper/bg_"+Math.floor((Math.random() * 10))+".png", {speed: 500});
			</script>
			
	-->
	


  </body>
</html>
