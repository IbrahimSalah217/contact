var contatcList = [];
var flag;
var ii = 1;
var currentIndex =0;

function callPhone(){
	$("#callContactId").attr("href","tel"+contatcList[currentIndex].phone);
}
function saveSession(){
	localStorage.setItem("list",JSON.stringify(contatcList));
}
function getSession(){
	var  contactTest=  JSON.parse(localStorage.getItem("list"));
	if (contactTest !=null){

		contatcList = contactTest;
	}

	
	homePage();
}

   function addContact(){
	   console.log(ii++);
        flag =true;
        addNewContact();
   }
   function backAdd(){
	   homePage();
   }
   function deleteContact(){
	   contatcList.splice(currentIndex,1);
	   homePage();
   }
   function cancelAdd(){
	   window.history.back();
   }
   
$(document).ready(homePage);

function onContactItemClicked (index){
	currentIndex = index;
    $("#contactNameHeaderID").html(contatcList[index].name);
	$("#mobNumberID").html(contatcList[index].phone);
	$("#emailValueID").html(contatcList[index].email);
	if(contatcList[index].gender == "m"){
			$("#imageTypeID").attr("src","m1.png");
	}
			
		else
			$("#imageTypeID").attr("src","f1.png");
   
  $("#contactItemBackID").bind('click',function(){
	 homePage();
  });

  $("#editContactID").bind('click',function(){
    var conctactIndex = index;
    flag =false;
	addNewContact(conctactIndex);
});
    
}


function homePage() {
	   if  (contatcList != null){
       $(".cellClass").empty();
    $.each(contatcList, function(key, value ) {
		var imageSrc ="";
		/*if(value.gender == "m")
			imageSrc = "m1.png";
		else
		imageSrc = "f1.png";*/
	imageSrc = value.gender;
        var $cell = $("<li></li>");
		var $cellLink = $('<a href="#contactInformation" class="ui-btn ui-shadow ui-corner-all">');
		var $cellButton =$('<a  class="ui-btn ui-shadow ui-btn-icon-notext ui-btn-inline ui-corner-all ui-icon-phone">');
		$cellButton.attr("href","tel"+contatcList[key].phone);
        var $cellImage = $('<img alt="" class="ui-corner-all"src=\"'+imageSrc+'\"style="width: 20%;">');
        $cellLink.attr("href","#contactInformation")
        var $cellLabel = $('<lable><b> '+value.name+'<b></lable>');
		
        $cellImage.css ("width","15%");
		$cellImage.css("top","20%");
		$cellImage.css("left","10%");
        $cellImage.css ("display","inline");
		$cellLabel.css("display","inline");
		$cellLabel.css("position","absolute");
		$cellLabel.css("left","35%");
		$cellLabel.css("top","20%");
		$cellLabel.css("font-size","15px");
		$cellButton.css ("display","inline");
		$cellButton.css("position","absolute");
		$cellButton.css("right","10%");
		$cellButton.css("bottom","0%");
        $cellLink.append($cellImage);
		$cellLink.append($cellLabel);
		$cellLink.append($cellButton);
        $cell.append($cellLink);
		

        $cell.bind ("click",function (){
            var index = key;
			 console.log(ii++);
            onContactItemClicked(index);  
       });
       
       $cell.attr ("class","cellClass");
        $("#contatcListID").append($cell);

	});  
}

    
}

function addNewContact (){
	$("#saveNewContact").removeAttr("disabled");
	$("#cancel").removeAttr("disabled");
    if(!flag){
        $("#nameID").val(contatcList[currentIndex].name);
        $("#telID").val(contatcList[currentIndex].phone);
       $("#emailID").val(contatcList[currentIndex].email);
       $("#genderID").val(contatcList[currentIndex].gender == "m"? ("off"):("on"));
       }
	else{
		$("#nameID").val("");
        $("#telID").val("");
       $("#emailID").val("");
       $("#genderID").val("off");
	}
}
function saveContact(){
	saveSession();
	if(flag){
        add();
    }
    else{
        var conctactIndex =currentIndex;
        editContact(conctactIndex);
    }
    
}

function editContact (index){
	 $("#nameID").css("border","black solid 0px");
	 $("#nameID").attr("placeholder", "Enter your name");
	 $("#telID").css("border","black solid 0px");
	 $("#telID").attr("placeholder", "Enter your phone");
	 $("#emailID").css("border","black solid 0px");
	 $("#emailID").attr("placeholder", "Enter your email");
	 
	var name =  $("#nameID").val();
	var phone =  $("#telID").val();
	var email =  $("#emailID").val();
	//var gender =  ($("#genderID").val() == "off" ) ? ("m"):("f") ;
	
	var gender = $("#genderID").val();
	
	if(name !=""&&(validatePhone())&& (validateMial())){
		contatcList[index].name =  name;
		contatcList[index].phone = phone; 
		contatcList[index].email =  email;
		contatcList[index].gender =  gender;
		$("#saveNewContact").attr("disabled", "disabled");
		$("#cancel").attr("disabled", "disabled");
	}else{
		if(name ==""){
			 $("#nameID").css("border","red solid 1px");
			 $("#nameID").attr("placeholder", "Enter valid value");
			 
		}
		if(!validatePhone()){
			 $("#telID").css("border","red solid 1px");
			 $("#telID").attr("placeholder", "Enter valid value");
		}
		if(!validateMial()){
			 $("#emailID").css("border","red solid 1px");
			 $("#emailID").attr("placeholder", "Enter valid value");
		}
	}
}

function add(){
	 $("#nameID").css("border","black solid 0px");
	 $("#nameID").attr("placeholder", "Enter your name");
	 $("#telID").css("border","black solid 0px");
	 $("#telID").attr("placeholder", "Enter your phone");
	 $("#emailID").css("border","black solid 0px");
	 $("#emailID").attr("placeholder", "Enter your email");
	
    var name = $("#nameID").val();
    var phone = $("#telID").val();
    var email = $("#emailID").val();
    var genderValue =  $("#genderID").val();
	if(name !=""&&(validatePhone())&& (validateMial())){
		var gender;
		if (genderValue =="off"){
			var gender = "m";
		}else {
			gender = "f";
		}
		var  friend = new Friend (name,phone,email,gender);
		
		contatcList[contatcList.length] =friend;
		$("#saveNewContact").attr("disabled", "disabled");
	$("#cancel").attr("disabled", "disabled");
	}
	else{
		if(name ==""){
			 $("#nameID").css("border","red solid 1px");
			 $("#nameID").attr("placeholder", "Enter valid value");
			 
		}
		if(!validatePhone()){
			 $("#telID").css("border","red solid 1px");
			 $("#telID").attr("placeholder", "Enter valid value");
		}
		if(!validateMial()){
			 $("#emailID").css("border","red solid 1px");
			 $("#emailID").attr("placeholder", "Enter valid value");
		}
	}
}

function Friend (name,phone,email,gender){
    this.name =  name;
    this.phone = phone;
    this.email= email;
    this.gender = gender;
}

function validateMial(){
	if ($("#emailID").val().match(/.*@.*\.com/)){
		return true;
	}
	return false;
}
function validatePhone(){
	var test = false;
	if ($("#telID").val().match(/^(01)\d{9}$/)){
		return true;
	}
	return false;
}