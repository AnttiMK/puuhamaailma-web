var clipboard = new ClipboardJS(".joinButton");

clipboard.on('success', function(e) {
    $(".joinButton").tooltip('show');
      setTimeout(function() {
        $(".joinButton").tooltip('hide');
      }, 1500)
  });
  
  clipboard.on('error', function(e) {
  });