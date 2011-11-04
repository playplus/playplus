<?php header('Content-Type: text/html; charset=utf-8'); ?>
<html>
<head>
    <title>Play+ Project</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <style type="text/css">
        <?php readfile("ppstyle.css")?>
    </style>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js"></script>
    <script type="text/javascript">
        <?php readfile("ppweb.js")?>
    </script>
</head>
<body>
   <div id="centralizer">
       <div id="container">
           <div id="header">
               <b style="float: left;">Left Logo</b>
               <b style="float:right;">Right Logo</b>
           </div>
               <div class="splitter"></div>
           <div id="loading">Loading</div>
           <div id="coverdiv">
               <img id="coverart" style="display: none;" src="cover.png" onload="StopLoading()">
           </div>
           <div class="splitter"></div>
           <div id="content" style="display: none;">
               <div id="menu">
                   <a class="button" id="b0" href="#0">Link</a>
                   <a class="button" id="b1" href="#1">Link</a>
                   <a class="button" id="b2" href="#2">Link</a>
                   <a class="button" id="b3" href="#3">Link</a>
                   <a class="button" id="b4" href="#4">Link</a>
               </div>
               <div id="text">
                   <div id="t0" class="text"><?php readfile("t/home.html"); ?></div>
                   <div id="t1" class="text"><?php readfile("t/ideas.html"); ?></div>
                   <div id="t2" class="text"><?php readfile("t/install.html"); ?></div>
                   <div id="t3" class="text"><?php readfile("t/develop.html"); ?></div>
                   <div id="t4" class="text"><?php readfile("t/about.html"); ?></div>
               </div>
           </div>
       </div>
   </div>
</body>
</html>
 
