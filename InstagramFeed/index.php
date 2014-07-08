

<?php

// function fetchData($url){
// 	$ch = curl_init();
// 	curl_setopt($ch, CURLOPT_URL, $url);
// 	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// 	curl_setopt($ch, CURLOPT_TIMEOUT, 20);
// 	$result = curl_exec($ch);
// 	curl_close($ch); 
// 	return $result;
// }

?>

<html>

	<head>
		<title>Instagram Feed.</title>

		<!-- include stylesheets here-->
		<!-- <link href="style.css" type="text/css" rel="stylesheet"> -->
		<!-- include javascript here-->
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>

	</head>

	<body>

		<div class="feed">

	  		<?php

	  		if( isset($_GET["UserId"]) ) {

			   $user = (string)trim($_GET["UserId"]);
			
			   echo "Images for user: " . $user;

				require_once 'php/instagram.class.php';

				// Initialize class for public requests
				$instagram = new Instagram('6342c0f526eb41baa643d7521382a7ed');

				// $user = '1014608391';
				// $user = '1140920560';
				
				// Get recently tagged media
				$media = $instagram->getUserMedia($user, 19);

					
				foreach ($media->data as $data) {

					$date = date('d M. Y', $data->created_time);
					$tags = implode(' #', $data->tags);
					$hash = '#';
					$tags = $hash . $tags;

						echo "<div>";
							echo "<img alt=\"instagram image\" src=\"{$data->images->standard_resolution->url}\"/>";
							echo "<span class=\"date\">{$date}</span>";
							echo "<span class=\"tags\">{$tags}</span>";
						echo "</div>";		
				}

				?>

			</div>

			<div class="load-more">
				<?php

				echo "<button id=\"social-more\" class=\"btn btn-default\" data-maxid=\"{$media->pagination->next_max_id}\" data-user=\"{$user}\">load more</button>";

				?>
			</div>

			<!-- custom JS here -->
			<script type="text/javascript">

				$(document).ready(function() {
					'use strict';

					var $container = $('.feed');

					$('#social-more').click(function() {
							
						var user = $(this).data('user'),
						
						maxid = $(this).data('maxid');

						$.ajax({
							type: 'GET',
							url: 'php/instagram.php',
							data: {
								user: user,
								max_id: maxid
							},
							dataType: 'json',
							cache: false,
							success: function(response) {
								
								var	count = response.data.length;
								
							
								$.each(response.data, function(i, value) {
									setTimeout(function() {

										console.log(i + value);

										var fragment = document.createDocumentFragment(),
										elements_social = [],
											node = $('<div><img alt="instagram image" src="' + value.src + '"/><span class="date">' +
													value.date + '</span><span class="tags">' + value.tag + '</span></div>').get(0);
										
										fragment.appendChild(node);
										elements_social.push(node);

										$container.append( fragment );									


									}, 100 * i);
								});


								// Store new maxid
								$('#social-more').data('maxid', response.data.next_id);
							}
						});
					});
				});
			</script>

			<?php
			
				}
				
				else {
				   echo "Please enter '?UserId=#' where # is the Instagram UserID behind the current URL and hit enter.";
				}

			?>
	</body>
</html>
