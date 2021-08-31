<?php $form = handle_form_postdata( $_POST ); ?>
<!doctype html>
<!--[if IE 8]><html class="no-js lt-ie9" lang="en"><![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>

	<!-- Basic Page Needs
	================================================== -->
	<meta charset="utf-8">
	<title>Booking &ndash; Santorini</title>
	<meta name="description" content="">
	<meta name="author" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<!-- CSS
	================================================== -->
	<link href='http://fonts.googleapis.com/css?family=Lato:400,700,400italic%7CMontserrat:400,700' rel='stylesheet' type='text/css'>
	<link rel='stylesheet' href='css/flexslider.css'>
	<link rel='stylesheet' href='css/font-awesome.css'>
	<link rel='stylesheet' href='css/weather-icons.css'>
	<link rel='stylesheet' href='css/bootstrap.css'>
	<link rel='stylesheet' href='css/prettyPhoto.css'>
	<link rel='stylesheet' href='css/mmenu.css'>
	<link rel='stylesheet' href='css/jquery-ui-1.10.4.datepicker.min.css'>
	<link rel='stylesheet' href='style.css'>
	<link rel='stylesheet' href='css/mediaqueries.css'>
	<link rel='stylesheet' href='colors/default.css'>

	<!-- Favicons
	================================================== -->
	<link rel="shortcut icon" href="#">
	<link rel="apple-touch-icon" href="#">
	<link rel="apple-touch-icon" sizes="72x72" href="#">
	<link rel="apple-touch-icon" sizes="114x114" href="#">

	<!--[if lt IE 9]>
	<script src="js/html5shiv.js"></script>
	<![endif]-->

	<style>
		/*
		 When implementing this in a CMS, these styles should remain in the head
		 and use if logic to switch between the .fwslider or alternative
		 version of the theme (for correct header display). .fwslider or .alt in the body
		 tag will convert the header display to white background with grey letters,
		 as in index_alt.html -- feel free to delete this comment when you have no
		 use for it
		*/
		#header {
			background: url("http://placehold.it/1920x230") no-repeat center top;
		}

		.fwslider #header { background: none; }
	</style>
	<script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>

</head>
<body class=" ">

<div id="mobile-bar">
	<a class="menu-trigger" href="#mobilemenu"><i class="fa fa-bars"></i></a>
	<h1 class="mob-title">Booking</h1>
</div>

<div id="page">
	<header id="header">
		<div class="container">
			<div class="row">
				<div class="col-lg-10 col-lg-offset-1">
					<div class="row pre-head">
						<div class="col-sm-6">
							<div id="weather">
								<i class="ywicon"></i>
								<span id="ywloc"></span>
								<span id="ywtem"></span>
							</div>
						</div>

						<div class="col-sm-6">
							<aside id="icl_lang_sel_widget" class="widget icl_languages_selector group"><h3 class="widget-title">Languages</h3><div id="lang_sel">
								<ul>
									<li>
										<a href="#" class="lang_sel_sel icl-en">

										<img class="iclflag" src="images/flags/en.png" alt="en" title="English">
										&nbsp;English</a>
										<ul>
											<li class="icl-fr">
												<a href="http://www.cssigniter.com/preview/santorini/fr/">
													<img class="iclflag" src="images/flags/fr.png" alt="fr" title="Français">&nbsp;
													Français
												</a>
											</li>
											<li class="icl-de">
												<a href="http://www.cssigniter.com/preview/santorini/de/">
													<img class="iclflag" src="images/flags/de.png" alt="de" title="Deutsch">&nbsp;
													Deutsch
												</a>
											</li>
											<li class="icl-it">
												<a href="http://www.cssigniter.com/preview/santorini/it/">
													<img class="iclflag" src="images/flags/it.png" alt="it" title="Italiano">&nbsp;
													Italiano
												</a>
											</li>
											<li class="icl-ru">
												<a href="http://www.cssigniter.com/preview/santorini/ru/">
													<img class="iclflag" src="images/flags/ru.png" alt="ru" title="Русский">&nbsp;
													Русский
												</a>
											</li>
											<li class="icl-es">
												<a href="http://www.cssigniter.com/preview/santorini/es/">
													<img class="iclflag" src="images/flags/es.png" alt="es" title="Español">&nbsp;
													Español
												</a>
											</li>
											<li class="icl-el">
												<a href="http://www.cssigniter.com/preview/santorini/el/">
													<img class="iclflag" src="images/flags/el.png" alt="el" title="Ελληνικα">&nbsp;
													Ελληνικα
												</a>
											</li>
										</ul>

									</li>
								</ul>
							</div>
							</aside>
						</div>
					</div> <!-- .row.pre-head -->
					<hr/>

					<nav class="nav row">
						<div class="col-sm-5">
							<ul class="navigation left-nav">
								<li><a href="index.html">Home</a></li>
								<li><a href="index_alt.html">Home 2</a></li>
								<li><a href="listing-3col.html">Listing</a>
									<ul>
										<li><a href="listing-4col.html">Listing 4 Columns</a></li>
									</ul>
								</li>
								<li><a href="room.html">Single Room</a></li>
							</ul>
						</div>

						<div class="col-sm-2">
							<h1 class="logo"><a href="index.html"><img src="images/dummy/logo_white.png" alt=""></a></h1>
						</div>

						<div class="col-sm-5">
							<ul class="navigation right-nav">
								<li><a href="blog.html">Blog</a>
									<ul>
										<li><a href="">Sub Item</a></li>
										<li><a href="">Multi Level</a>
											<ul>
												<li><a href="">Another level</a></li>
												<li><a href="">Another level</a></li>
												<li><a href="">Another level</a></li>
												<li><a href="">Another level</a></li>
											</ul>
										</li>
										<li><a href="">Sub Item</a></li>
									</ul>
								</li>
								<li class='current'><a class='current' href="booking.html">Booking</a></li>
								<li><a href="gallery-single.html">Galleries</a></li>
								<li><a href="contact.html">Contact</a></li>
							</ul>
						</div>
					</nav>

					<div id="mobilemenu">
						<ul>
							<li><a href="index.html">Home</a></li>
							<li><a href="index_alt.html">Home 2</a></li>
							<li><a href="listing-3col.html">Listing</a></li>
							<li><a href="listing-4col.html">Listing 4 Columns</a></li>
							<li><a href="blog.html">Blog</a>
								<ul>
									<li><a href="">Sub Item</a></li>
									<li><a href="">Sub Item</a></li>
									<li><a href="">Sub Item Longer</a></li>
									<li><a href="">Sub Item</a></li>
								</ul>
							</li>
							<li class='current'><a class='current' href="booking.html">Booking Page</a></li>
							<li><a href="gallery-single.html">Galleries</a></li>
							<li><a href="contact.html">Contact</a></li>
						</ul>
					</div>
				</div> <!-- main container -->
			</div>
		</div>
	</header>

<main id="main">
	<div class="container">
		<div class="row">
			<div class="col-lg-10 col-lg-offset-1">
				<h2 class="page-title">booking</h2>

				<div class="row">
					<div class="col-sm-8">
						<article class="entry">

							<?php show_form_errors( $form ); ?>
							<?php show_email_result( $form ); ?>

							<?php if ( !isset( $form['send_booking'] ) or ( isset( $form['send_booking'] ) and !empty( $form['errorString'] ) ) ): ?>
								<form class="booking" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">

									<div class="row">
										<div class="col-md-6">
											<input type="text" name="the_name" id="the_name" placeholder="your name" value="<?php echo $form['the_name']; ?>">
										</div>

										<div class="col-md-6">
											<input type="email" name="the_email" id="the_email" class="datepicker" placeholder="your email" value="<?php echo $form['the_email']; ?>">
										</div>
									</div>

									<div class="row">
										<div class="col-md-6">
											<input type="text" name="arrive" id="arrive" class="datepicker" placeholder="arrival" value="<?php echo $form['arrive']; ?>">
										</div>

										<div class="col-md-6">
											<input type="text" name="depart" id="depart" class="datepicker" placeholder="departure" value="<?php echo $form['depart']; ?>">
										</div>
									</div>

									<div class="row">
										<div class="col-md-6">
											<select name="guests" id="guests" class="dk">
												<option value="">adults</option>
												<option value="1" <?php selected('1', $form['guests']); ?>>1</option>
												<option value="2" <?php selected('2', $form['guests']); ?>>2</option>
												<option value="3" <?php selected('3', $form['guests']); ?>>3</option>
												<option value="4" <?php selected('4', $form['guests']); ?>>4</option>
											</select>
										</div>

										<div class="col-md-6">
											<select name="children" id="children" class="dk">
												<option value="">children</option>
												<option value="1" <?php selected('1', $form['children']); ?>>1</option>
												<option value="2" <?php selected('2', $form['children']); ?>>2</option>
												<option value="3" <?php selected('3', $form['children']); ?>>3</option>
												<option value="4" <?php selected('4', $form['children']); ?>>4</option>
											</select>
										</div>
									</div>

									<div class="row">
										<div class="col-md-12">
											<select name='room_select' id='room_select' class='dk'>
												<option value="">room</option>
												<option value="1" <?php selected('1', $form['room_select']); ?>>Single</option>
												<option value="2" <?php selected('2', $form['room_select']); ?>>Deluxe Double</option>
												<option value="3" <?php selected('3', $form['room_select']); ?>>Suite I</option>
												<option value="4" <?php selected('4', $form['room_select']); ?>>Suite II</option>
												<option value="5" <?php selected('5', $form['room_select']); ?>>King's Suite</option>
											</select>

											<textarea name="the_message" id="the_message" cols="30" rows="10" placeholder="comments"><?php echo $form['the_message']; ?></textarea>

											<button type="submit" name="send_booking">submit</button>
										</div>
									</div>
								</form>
							<?php endif; ?>
						</article>
					</div>

					<div class="col-sm-4">
						<div class="sidebar">

						<div class="widget widget_ci_testimonial_widget">
							<div class="testimonial-wrap">
								<div class="testimonial-inner">
									<blockquote>

										<i class="fa fa-quote-left"></i>
										<p>The best experience ever. Would recommended it everyone. We got married in Santorini, and stayed at Santorini Resort, and it was a dream come true.</p>

										<cite>Peter Daniel &ndash; Travel Magazine</cite>
									</blockquote>
								</div>
							</div>
						</div>


								<aside class="widget widget_ci_social_widget ci-socials group">
									<h3 class="widget-title">social</h3>
									<a href="#" class="social-icon" title="Subscribe to our RSS feed."><i class="fa fa-rss"></i></a>
									<a href="http://www.twitter.com/cssigniter" class="social-icon" title="Follow us on twitter."><i class="fa fa-twitter"></i></a>
									<a href="http://www.facebook.com/cssigniter" class="social-icon" title="Like us on Facebook."><i class="fa fa-facebook"></i></a>
									<a href="http://www.dribbble.com/tsiger" class="social-icon" title="See our Dribbble shots."><i class="fa fa-dribbble"></i></a>
								</aside>


								<div class="widget widget_ci_newsletter_widget">
									<h3 class="widget-title">newsletter</h3>

									<p>Get explosive offers straight to your inbox and win a free weekend stay!</p>
									<form class="ci-newsletter" action="/">
										<input type="email" name="ci_newsletter_email" id="ci_newsletter_email" placeholder="your email">
										<button type="submit"><i class="fa fa-chevron-right"></i></button>
									</form>
								</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

	<footer id="footer">
		<div class="container">
			<div class="row">
				<div class="col-lg-10 col-lg-offset-1">
					<hr>

					<nav class="nav row">
						<div class="col-sm-5">
							<ul class="navigation left-nav">
								<li><a href="index.html">Home</a></li>
								<li><a href="index_alt.html">Home 2</a></li>
								<li><a href="listing-3col.html">Listing</a></li>
								<li><a href="room.html">Single Room</a></li>
							</ul>
						</div>

						<div class="col-sm-2">
							<div class="logo"><a href="index.html"><img src="images/dummy/logo_grey.png" alt=""></a></div>
						</div>

						<div class="col-sm-5">
							<ul class="navigation right-nav">
								<li><a href="blog.html">Blog</a></li>
								<li class='current'><a class='current' href="booking.html">Booking</a></li>
								<li><a href="listing-3col.html">Galleries</a></li>
								<li><a href="contact.html">Contact</a></li>
							</ul>
						</div>
					</nav>

					<p class="credits">Made in CSSigniter.com</p>
				</div>
			</div>
		</div>
	</footer>
</div> <!-- #page -->

<!-- Javascript
================================================== -->
<script src='js/jquery-1.10.1.min.js'></script>
<script src='js/jquery-ui-1.10.4.custom.min.js'></script>
<script src='js/superfish.min.js'></script>
<script src='js/jquery.flexslider-min.js'></script>
<script src='js/jquery.mmenu.min.js'></script>
<script src='js/jquery.dropkick-min.js'></script>
<script src='js/jquery.fitvids.js'></script>
<script src='js/jquery.prettyPhoto.js'></script>
<script src='js/contact.js'></script>
<script src='js/scripts.js'></script>

</body>
</html>
<?php
	function handle_form_postdata( $post_array ) {
		$data = array();

		// Sanitize data, or initialize if they don't exist.
		$data['the_name']    = isset( $post_array['the_name'] ) ? trim( $post_array['the_name'] ) : '';
		$data['the_email']   = isset( $post_array['the_email'] ) ? trim( $post_array['the_email'] ) : '';
		$data['arrive']      = isset( $post_array['arrive'] ) ? trim( $post_array['arrive'] ) : '';
		$data['depart']      = isset( $post_array['depart'] ) ? trim( $post_array['depart'] ) : '';
		$data['guests']      = isset( $post_array['guests'] ) ? trim( $post_array['guests'] ) : '';
		$data['children']    = isset( $post_array['children'] ) ? trim( $post_array['children'] ) : '';
		$data['the_message'] = isset( $post_array['the_message'] ) ? filter_var( $post_array['the_message'], FILTER_SANITIZE_STRING ) : '';

		if ( !empty( $post_array['room_select'] ) ) {
			$data['room_select'] = intval( $post_array['room_select'] );
		} elseif ( !empty( $_GET['room_select'] ) ) {
			$data['room_select'] = intval( $_GET['room_select'] );
		} else {
			$data['room_select'] = '';
		}

		$data['errorString'] = '';
		$data['emailbody']   = '';
		$data['emailSent']   = false;

		if ( isset( $post_array['send_booking'] ) ) {
			$data['send_booking'] = $post_array['send_booking'];

			// We are here because the form was submitted. Let's validate!

			if ( empty( $data['the_name'] ) ) {
				$data['errorString'] .= '<li>Your name is required.</li>';
			}

			if ( empty( $data['the_email'] ) ) {
				$data['errorString'] .= '<li>A valid email is required.</li>';
			}

			if ( empty( $data['arrive'] ) ) {
				$data['errorString'] .= '<li>An arrival date is required.</li>';
			}

			if ( empty( $data['depart'] ) ) {
				$data['errorString'] .= '<li>A departure date is required.</li>';
			}

			if ( empty( $data['guests'] ) or intval( $data['guests'] ) < 1 ) {
				$data['errorString'] .= '<li>A number of one or more adults is required.</li>';
			}

			// Children are optional, so, no check.
			// Message is optional, so, no check.


			// Alright, lets send the email already!
			if ( empty( $data['errorString'] ) ) {
				$data['emailbody']  = "Name:" . " " . $data['the_name'] . "\n";
				$data['emailbody'] .= "Email:" . " " . $data['the_email'] . "\n";
				$data['emailbody'] .= "Arrival:" . " " . $data['arrive'] . "\n";
				$data['emailbody'] .= "Departure:" . " " . $data['depart'] . "\n";
				$data['emailbody'] .= "Guests:" . " " . $data['guests'] . "\n";
				$data['emailbody'] .= "Children:" . " " . $data['children'] . "\n";
				$data['emailbody'] .= "Room:" . " " . $data['room_select'] . "\n";
				$data['emailbody'] .= "Message:" . " " . $data['the_message'] . "\n";

				$data['emailSent'] = mail( 'your@email.com', 'Subject', $data['emailbody'], 'From: "' . $data['the_name'] . '" <' . $data['the_email'] . '>' );
			}

		}

		return $data;
	}

	function show_form_errors( $data ) {
		if ( !empty( $data['errorString'] ) ) {
			echo '<ul id="formerrors">';
			echo $data['errorString'];
			echo '</ul>';
		}
	}

	function show_email_result( $data ) {
		if ( $data['emailSent'] === true ) {
			echo '<p id="formsuccess">' . 'Your booking request has been sent. We will contact you as soon as possible.' . '</p>';
		} elseif ( $data['emailSent'] === false && isset( $data['send_booking'] ) && empty( $data['errorString'] ) ) {
			echo '<p id="sendfail">' . 'There was a problem while sending the email. Please try again later.' . '</p>';
		}
	}

	function selected( $selected, $current = true, $echo = true ) {
		if ( (string) $selected === (string) $current )
			$result = " selected='selected'";
		else
			$result = '';

		if ( $echo )
			echo $result;

		return $result;
	}

?>