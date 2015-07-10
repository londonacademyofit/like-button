// store the main Firebase URL
var firebaseURL = 'https://lait-examples.firebaseio.com/like-button/';

// update the likeCounts shown in a <span> beside each blogpost
var postDivs = document.querySelectorAll('.post');

for (var i = 0; i < postDivs.length; i++) {

    var postID = postDivs[i].id;

    var numLikes = getLikeCount(postID);

}

// this function grabs the likeCount for a particular post from the Firebase
function getLikeCount(postID) {
 
    console.log('running getLikeCount for post ID:', postID);
    
    var thisPostRef = new Firebase(firebaseURL + postID + '/like-count/');
    
    thisPostRef.on('value', function(snapshot) {
        
        console.log( postID + ' value:', snapshot.val() );
        
        if ( snapshot.val() ) {
            
            console.log( postID + ' contains:', snapshot.val() );

            document.querySelector('#' + postID + ' .like-count').innerHTML = snapshot.val() + ' likes';
            
        } else {
            
            console.log( postID + '- no data in Firebase' );
            
            return 0;
        
        }
    
    });
    
}

function likePost(id) {

    console.log('running likePost() for post ID:', id);
    
    var postRef = new Firebase(firebaseURL + id);
    
    // get current number of likes here, so we can increment if any exist
    postRef.child('like-count').once('value', function(snapshot){
        
        console.log( 'current likes:', snapshot.val() );
        
        var currentLikes = snapshot.val() ? snapshot.val() : 0;
        
        console.log( 'currentLikes:', currentLikes );
    
        postRef.update({
            
            'postID': id,
            'like-count': currentLikes + 1
            
            }, function(error) {
                
              if (error) {
                console.log("Data could not be saved." + error);
              } else {
                console.log("Data saved successfully.");
              }
            
            });
            
        getLikeCount(id);
    
    });
    
}