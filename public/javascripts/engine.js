function TestApp($scope) {
    $scope.tags = [
        {text:'side', done:true, count:0},
        {text:'car', done:false, count:0},
        {text:'on', done:false, count:0},
        {text:'#Twitter', done:false, count:0}];
    
    $scope.count = 0;
    $scope.twitts = [
        {user: {screen_name: 'Test'}, text: 'Text twitt'} 
    ];
    var socket = io.connect('http://localhost:3001');
    window.socket = socket;

  
    $scope.addTag = function() {
        if ($scope.tagText != '') {
            $scope.tags.push({text:$scope.tagText, done:false, count:0});
            $scope.tagText = '';
        };
    };

    $scope.deleteTag = function() {
        var oldTags = $scope.tags;
        $scope.tags=[];
        angular.forEach(oldTags, function(tag) {
            if (!tag.done) {
                $scope.tags.push(tag);
            }
        });
    };

    $scope.updateCount = function(item) {
        angular.forEach($scope.tags, function(tag){
            if ((item.text.indexOf(tag.text) != -1)) {
                tag.count ++;  
            }
        });
    };


    socket.on('newTwitt', function (item) {
        $scope.twitts.push(item);
        $scope.count++;

        $scope.updateCount(item);
 
        item.color = 'black';
        if ($scope.twitts.length > 15)
            $scope.twitts.splice(0, 1);
        $scope.$apply();

    })

}