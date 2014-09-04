<?php
	$siteURL = 'http://mulberry.com.staging.wednesdayagency.com/';
	$siteTitle = 'Mulberry';
	$siteDescription = 'Social Sharing Test for Mulberry/Cara';
	$siteAuthor = 'Wednesday';

	$assetWidth = 960;
	$assetHeight = 400;

	$jsonString = file_get_contents('./data/articles.json');
	$jsonObject = json_decode($jsonString, true);

	$resultsObject = new ArrayObject($jsonObject['results']);
	$articles = $resultsObject->getIterator();
	$articleCount = ($resultsObject->count() - 1);

	$currentArticle = $_GET['article'];
?><!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="description" content="<?php echo $siteTitle; ?>" />
		<meta name="author" content="<?php echo $siteAuthor; ?>" />

		<title><?php echo $siteTitle; ?></title>

		<link rel="icon" href="/favicon.ico" />
		<link href="style.css" rel="stylesheet" />
		<!-- <link href="/css/sticky-footer-navbar.css" rel="stylesheet" /> -->
		<!-- <link href="//vjs.zencdn.net/4.7/video-js.css" rel="stylesheet" /> -->


		<meta property="og:url" content="<?php echo 'http://' . $_SERVER[HTTP_HOST] . $_SERVER[REQUEST_URI]; ?>" />
		<meta property="og:site_name" content="<?php echo $siteTitle; ?>" />
		<?php if($currentArticle !== null): ?>
		<meta property="og:title" content="<?php echo $articles[$currentArticle]['title']; ?>" />
		<meta property="og:type" content="video" />
		<meta property="og:image" content="<?php echo $articles[$currentArticle]['fullImageURL']; ?>" />
		<meta property="og:description" content="<?php echo $articles[$currentArticle]['summary']; ?>" />
		<?php if($_GET['preview'] === null): ?>
		<script>
			window.location = '/';
		</script>
		<?php endif; ?>
		<?php if($articles[$currentArticle]['videoURL'] !== null): ?>
		<meta property="og:video" content="<?php echo 'http:' . $articles[$currentArticle]['videoURL']; ?>.mp4" />
		<meta property="og:video:secure_url" content="<?php echo 'https:' . $articles[$currentArticle]['videoURL']; ?>.mp4" />
		<meta property="og:video:type" content="video/mp4" />
		<meta property="og:video:width" content="970" />
		<meta property="og:video:height" content="<?php echo $assetHeight; ?>" />
		<meta property="og:video" content="<?php echo 'http:' . $articles[$currentArticle]['videoURL']; ?>.webm" />
		<meta property="og:video:secure_url" content="<?php echo 'https:' . $articles[$currentArticle]['videoURL']; ?>.webm" />
		<meta property="og:video:type" content="video/webm" />
		<meta property="og:video:width" content="<?php echo $assetWidth; ?>" />
		<meta property="og:video:height" content="<?php echo $assetHeight; ?>" />
		<meta property="video:duration" content="141" />
		<meta property="video:tag" content="Birds" />
		<meta property="video:tag" content="Fish" />
		<meta property="video:tag" content="Ocean" />
		<?php endif; ?>
		<?php else: ?>
		<meta property="og:title" content="<?php echo $siteTitle; ?>" />
		<meta property="og:type" content="website" />
		<meta property="og:image" content="<?php echo $siteURL; ?>img/logo.png" />
		<meta property="og:description" content="<?php echo $siteDescription; ?>" />
		<?php endif; ?>


	</head>

	<body>
		<!-- Begin page content -->
		<div class="container">

			<header class="page-header">
				<h1><?php echo $siteTitle; ?></h1>
			</header>

			<main>

				<?php if($currentArticle !== null): ?>
				<?php if($articles[$currentArticle]['videoURL'] !== null): ?>
				<div class="thumbnail" itemscope itemtype="http://schema.org/Product">
					<video id="main-video" controls preload="none" poster="<?php echo $articles[$currentArticle]['fullImageURL']; ?>" class="video-js vjs-default-skin vjs-big-play-centered">
						<source src="https:<?php echo $articles[$currentArticle]['videoURL']; ?>.mp4" type="video/mp4" />
						<source src="https:<?php echo $articles[$currentArticle]['videoURL']; ?>.webm" type="video/webm" />
						<track kind="captions" src="/vtt/captions.vtt" srclang="en" label="English" />
					</video>
					<div class="caption">
						<h3 itemprop="name"><?php echo $articles[$currentArticle]['title']; ?></h3>
						<span itemprop="description"><?php echo $articles[$currentArticle]['summary']; ?></span>
					</div>
				</div>
				<?php else: ?>
				<figure class="thumbnail" itemscope itemtype="http://schema.org/Product">
					<img src="<?php echo $articles[$currentArticle]['fullImageURL']; ?>" alt="<?php echo $articles[$currentArticle]['summary']; ?>" class="img-responsive" />
					<figcaption class="caption">
						<h3 itemprop="name"><?php echo $articles[$currentArticle]['title']; ?></h3>
						<span itemprop="description"><?php echo $articles[$currentArticle]['summary']; ?></span>
					</figcaption>
				</figure>
				<?php endif; ?>
				<footer clas="">
					<a href="/" class="btn btn-default">Back to landing page</a>
				</footer>
				<?php else: ?>

					<div id='overlay'>
						<div class="logo">
							<img src="img/Tree.png" />
						</div>
						<div class="pager">
							<span><span>
								<span><span>
									<span><span>
										<span><span>
						</div>
						<div class="play">
							<img src="img/playbutton.png" />
						</div>
						<div class="result">
							<h3>YOUR MATCH</h3>
							<p><span></span></p>
						</div>
						<div class="selector">
							<div class="left">
							</div>
							<div class="center">
								-	OR -
							</div>
							<div class="right">
							</div>
						</div>
						<div class="swipe-start">
							<p></p>
							<img src="img/arrowUp.png"/>
						</div>
					</div>
					<div id='share-overlay'>
						<div class="close">
							<img src="img/X.png" />
						</div>
						<h3>SHARE</h3>
						<p>Get social and show the world your Cara Delevingne bag.</p>

						<?php foreach($articles as $key => $properties): ?>

										<div id="share-<?php echo $key?>" class="share-buttons">
											<span st_url="<?php echo $siteURL . '?article=' . $key; ?>" class="st_facebook" displayText="Facebook"></span>
											<span st_url="<?php echo $siteURL . '?article=' . $key; ?>" st_via="karlitowhoelse" st_username="karlitowhoelse" class="st_twitter" displayText="Tweet"></span>
											<span st_url="<?php echo $siteURL . '?article=' . $key; ?>" class="st_googleplus" displayText="Google +"></span>
											<span st_url="<?php echo $siteURL . '?article=' . $key; ?>" class="st_pinterest" displayText="Pinterest"></span>
											<span st_url="<?php echo $siteURL . '?article=' . $key; ?>" class="st_tumblr" displayText="Tumblr"></span>
											<span st_url="<?php echo $siteURL . '?article=' . $key; ?>" class="st_sina" displayText="Sina"></span>
										</div>

						<?php endforeach; ?>

					</div>
					<div id='video-overlay'>
						<div class="close">
							<img src="img/close.png" />
						</div>
						<div class="video-container">
							<video id="home_video" controls preload="none" poster="img/tholder.png" class="video-js vjs-default-skin vjs-big-play-centered">
								<source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
								<source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm" />
							</video>
						</div>
					</div>
					<div id="up" class="left container">
						<div class="slide start">
						</div>
						<div class="slide choose one l1" data-sibling=".right .one" data-true="a" title="BULLDOG">
						</div>
						<div class="slide choose two l2" data-sibling=".right .two" data-true="Beagle" title="BALLOON">
						</div>
						<div class="slide choose three l3" data-sibling=".right .three" data-true="Backstage" title="SNEAKER">
						</div>
						<div class="slide choose four l4" data-sibling=".right .four" data-true="Lipstick" title="CHOICE FOUR LEFT">
						</div>
						<div class="slide choose five l5" data-sibling=".right .five" data-true="Street Art" title="CHOICE FIVE LEFT">
						</div>
						<div class="slide final">
							<div class="shop link">
								<a href="google.com">SHOP</a>
							</div>
						</div>
					</div>
					<div id="down" class="right container">
						<div class="slide final">
							<div class="share link">
								<a id="share-button" href="#">SHARE</a>
							</div>
						</div>
						<div class="slide choose five r5" data-sibling=".left .five" title="CHOICE FIVE RIGHT">
						</div>
						<div class="slide choose four r4" data-sibling=".left .four" title="CHOICE FOUR RIGHT">
						</div>
						<div class="slide choose three r3" data-sibling=".left .three" title="HIGH-HEELS">
						</div>
						<div class="slide choose two r2" data-sibling=".left .two" title="PEACE">
						</div>
						<div class="slide choose one r1" data-sibling=".left .one" title="BEAGLE">
						</div>
						<div class="slide start">
						</div>
					</div>

				<?php endif; ?>

			</main>

		</div>

		<!-- <footer class="footer">
			<div class="container">
				<p class="text-muted">&copy; <?php echo date('Y') . ' ' . $siteAuthor; ?></p>
			</div>
		</footer> -->

		<?php if($currentArticle === null): ?>
		<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
		<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery.touchswipe/1.6.4/jquery.touchSwipe.min.js"></script>
		<script type="text/javascript" src="js/main.js"></script>
		<script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
		<script type="text/javascript">stLight.options({publisher: "651870de-f8b6-4a50-94dd-e48703bb9e82", doNotHash: false, doNotCopy: false, hashAddressBar: false});</script>
		<?php endif; ?>
		<?php if($articles[$currentArticle]['videoURL'] !== null): ?>
		<script src="//vjs.zencdn.net/4.7/video.js"></script>
		<script>
			// custom player swf file
			_V_.options.flash.swf = "//vjs.zencdn.net/4.7/video-js.swf";

			// flashvars
			_V_.options.flash.flashVars = {
				file: "https:<?php echo $articles[$currentArticle]['videoURL']; ?>.mp4",
				image: "<?php echo $articles[$currentArticle]['fullImageURL']; ?>",
				autostart: "false",
				provider: "http",
				"http.startparam": "starttime"
			};

			// object params
			_V_.options.flash.params = {
				allowfullscreen: "true",
				wmode: "transparent",
				allowscriptaccess: "always"
			};

			// object attributes (such as id, name, class, etc.)
			_V_.options.flash.attributes={};
		</script>
		<?php endif; ?>

	</body>
</html>
