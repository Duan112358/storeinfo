function addComment() {
    var comment_input = document.querySelector(".comment-window input.comment-content");
    var ratting_ctrl = document.querySelector(".comment-window .rating");

    comment_input.addEventListener("focus", function(event) {
    	ratting_ctrl.style.display = "block";
    });
    comment_input.addEventListener("blur", function(event) {
        ratting_ctrl.style.display = "none";
    });
}

addComment();