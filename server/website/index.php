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
               <bb style="float: left;"><img src="img/logo.png" onclick="location.href='index.php';"></bb>
               <dd style="float:right;"><img src="img/vmp.png" onclick="location.href='http://www.vmp.ethz.ch';"></dd>
           </div>
               <div class="splitter"></div>
           <div id="loading">Loading</div>
           <div id="coverdiv">
               <img id="coverart" style="display: none;" src="img/cover.png" onload="StopLoading()">
           </div>
           <div class="splitter"></div>
           <div id="content" style="display: none;">
               <div id="menu">
               <?php
                   for($i=0;$i<5;$i++) {
                    echo '<div class="button"><a id="b'.$i.'" href="#'.$i.'"><img src="img/b'.$i.'.png"></a><span class="underline"></span>';
                    echo $i!=4?'<span class="divide"></span>':'';
                    echo'</div>';
                   }
               ?>
               </div>
               <div id="text">
                   <div id="t0" class="text"><?php readfile("txt/home.html"); ?></div>
                   <div id="t1" class="text"><?php readfile("txt/ideas.html"); ?></div>
                   <div id="t2" class="text"><?php readfile("txt/install.html"); ?></div>
                   <div id="t3" class="text"><?php readfile("txt/develop.html"); ?></div>
                   <div id="t4" class="text"><?php readfile("txt/about.html"); ?></div>
               </div>
           </div>
       </div>
   </div>
</body>
</html>
 
