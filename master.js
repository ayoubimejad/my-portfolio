//###### `
 let ulChildren= Array.from(document.querySelector(".colors").children);
 let backgroundChoices= Array.from(document.querySelector(".choices").children);
 let links = document.querySelectorAll(".links li a");
 let bullets = Array.from(document.querySelectorAll(".bullets .bullet"));
  // ========== setting  =========//
  document.querySelector(".setting .icon i").addEventListener("click", () => {
    document.querySelector(".setting").classList.toggle("open");
    document.querySelector(".setting").classList.contains("open") ? document.querySelector(".setting .icon i").classList.add("fa-spin") :document.querySelector(".setting .icon i").classList.remove("fa-spin") ;
  });
  // ========== access header links ==========// 
 function scrollPage(arr) {
  arr.forEach((link) => {
    link.addEventListener("click", (e) => {
      arr.forEach((link) => link.classList.remove("active"));
      e.target.classList.add("active");
      document.querySelector(`.${e.target.textContent}`).scrollIntoView({
        behavior : "smooth",
      });
    })
  });
 }
scrollPage(links);

// ============= access for landing icon bars ===========//
 document.querySelector("i.media").onclick= (e) =>{
     document.querySelector("header ul.links").classList.toggle("opn");
 }
 links.forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector("header ul.links").classList.remove("opn");
  });
 });
// get array from colors
let arrayColors= ["#0081ff","#FF4136","#34A65F","#FF851B","#e9007f"];

ulChildren.forEach(function (ele,index) {
    ele.dataset.color= arrayColors[index];
});

// add setting default value 
   if(window.localStorage.getItem("Colors") !== null){
    let setColor= JSON.parse(window.localStorage.getItem("Colors"));
    document.querySelector(":root").style.setProperty("--main-color",setColor[setColor.length-1]);
    ulChildren.forEach( ele => {
      if(ele.dataset.color === setColor[setColor.length-1]){
           ele.classList.add("active");
      }
  });
   }else{
    //document.querySelector(":root").style.setProperty("--main-color",)
   }

  // loop into li and add event change root color
  ulChildren.forEach(function (ele) {

    ele.onclick=function (e) {

        // add color to localStorage
        if(window.localStorage.getItem("Colors") === null){
         let colorArray=[];
         colorArray.push(e.target.dataset.color);
         window.localStorage.setItem("Colors",JSON.stringify(colorArray));
        }else{
          let resetLocal=  JSON.parse(window.localStorage.getItem("Colors"));
          resetLocal.push(e.target.dataset.color);
            window.localStorage.setItem("Colors",JSON.stringify(resetLocal));
        }

        ulChildren.forEach((ele) => ele.classList.remove('active'));
        e.target.classList.add("active");
        document.querySelector(":root").style.setProperty("--main-color", e.target.dataset.color);
    }
  });

  // variable for settingImageBackground function
  let randomizeImgs;
  let yesNo;
  // access for setting background
  backgroundChoices.forEach(function (ele) {

    ele.onclick=function (e) {
     
      // remove active class from all
      backgroundChoices.forEach((ele) => ele.classList.remove('active'));
      // add avtive class to the clicked letter
      e.target.classList.add("active");

      if(e.target.classList.contains("yes")){

        // reset interval
        clearInterval(randomizeImgs);

        // make randomize image work in page
        settingImageBackground(true);
        e.target.classList.add("disabled");

      }else{
        backgroundChoices.forEach((ele) => ele.classList.contains('disabled') ?ele.classList.remove('disabled'):"");
        // remove randomize image in page
        settingImageBackground(false);

      }
      
    }
  });
 // randomaize image and use it in background
 
 function settingImageBackground(boleon) {
  
  if(boleon === true){

    // add class active to yes element by default
    backgroundChoices[0].classList.add("active");

    randomizeImgs= setInterval(() => {
      let randomNum= Math.ceil(Math.random() * 6);
      document.querySelector(".overlay").style.backgroundImage= `url(./images/image-${randomNum}.jpg)`;
    },9000);
  }else{
    clearInterval(randomizeImgs);
  } 
 }
 // add default value  
 settingImageBackground(true);

 // ================ add function navigation ===========//
 function Navigation() {
  
  let bullets = Array.from(document.querySelectorAll(".bullets .bullet"));

  bullets.forEach((bullet) => {

    // add dataset to the bullets
     bullet.dataset.section = bullet.firstElementChild.innerHTML;
    
     bullet.addEventListener("click", (e) => {
      document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
        behavior : "smooth",
      });
     })
  });
  
 }
  Navigation();
 // ================ end function navigation ===========//

// #### element.offsetTop is calculate the height from this element to top body
// ###### offsetHeight is the height of this class including padding margin....
// window.innerheight is the hieght of window
// ============= add skills action ===========//
window.onscroll= function () {
  let skillsHeight= document.querySelector(".skills").offsetHeight;
  let skillssetop= document.querySelector(".skills").offsetTop;
  let windowHeight= window.innerHeight;
  let htmlElementHeight= document.documentElement.scrollHeight;
  //console.log(window.scrollY)
  //console.log(((skillssetop -window.innerHeight)+skillsHeight)); //ixpected 990 insted got 508
 if (Math.ceil(window.scrollY) >= ((skillssetop -window.innerHeight)+(skillsHeight-300))){
  //console.log("yes")
    document.querySelectorAll(".progress span").forEach((ele) => {
  ele.style.animation = "0.5s move-right  ease-in-out";
});
  }else{
    document.querySelectorAll(".progress span").forEach((ele) => {
      ele.style.animation = "";
    });
  }

}
// ============= end skills action ===========//

// ==========access is gallery  ===========//
document.querySelectorAll(".gallery .image img").forEach((img) => {
  img.addEventListener("click", (e) => {
   // create div overlay
   let overlayDiv = document.createElement("div");
   overlayDiv.className = "overlaw";
   //console.log(e.target.src);
   // create div image-box
   let imageBoxDiv = document.createElement("div");
   imageBoxDiv.className = "image-box";

   //create heading h3
   let hthree= document.createElement("h3");
   hthree.textContent = "ayoub";
   // create image 
   let image = document.createElement("img");
   image.src = e.target.src;
   
    //create span for remove popub
    let myspan= document.createElement("span");
    myspan.className = "remove";
    myspan.textContent= "X";

   // append image and heading in div image-box
    imageBoxDiv.appendChild(hthree);
    imageBoxDiv.appendChild(image);
    imageBoxDiv.appendChild(myspan);
   // append imageBoxDiv to overlay div
   overlayDiv.appendChild(imageBoxDiv);
   myspan.addEventListener("click", () => overlayDiv.remove() );
   // now append overlay div to the body
   document.querySelector(".gallery").appendChild(overlayDiv);
  })
});
// ============ end access gallery  ==========//

// ============= add reset function =============//
function reset() {
  formInputs= Array.from(document.getElementById("contactme").children);
  formInputs.forEach((input) => {
  input.classList.contains("submit")? false: input.value= "";
  });
}
let gmailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
document.getElementById("contactme").onsubmit=function (e) {
  e.preventDefault();
  // check for email is validat or not
  if(gmailRegex.test(document.getElementById("email").value) ){
     sendEmail();
     reset();
     return false;
   }else{
      promptFunction();
      reset();
   }
  
}
// ============= add function sen email =============//
function sendEmail() {
  Email.send({
    SecureToken : "c233cd42-3268-4cb3-9200-062dd0abc73c",
    To : 'ayoubimejad7@gmail.com',
    From : "ayoubimejad7@gmail.com",
    Subject : "This is the subject",
    Body : "name: "+ document.querySelector(".name").value
    +"<br> Email: "+ document.getElementById("email").value
    +"<br> message: "+ document.querySelector(".message").value
 }).then(
 message => alert("message send succesfully ")
);
}
// ============= access icon that scrolling into top the body ==================//
window.addEventListener("scroll", () => {

  window.scrollY > window.innerHeight? document.querySelector(".navigation").classList.add("show") :document.querySelector(".navigation").classList.remove("show") ;

});
document.querySelector(".navigation").onclick= (e)=> {
  window.scrollTo({
    top : 0,
    behavior : "smooth"
  })
}
// ============= end access icon that scrolling into top the body ==================//
// ======== go to github ======//
document.querySelectorAll(".features .container .box a").forEach((a) => {
  a.addEventListener("click", () => {
    window.open("https://github.com/ayoubimejad","_blank")
  });
});



