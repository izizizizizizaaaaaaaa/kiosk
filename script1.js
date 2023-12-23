let inout = ""

document.getElementById("in").addEventListener("click",function(){
    inout = "매장"
    localStorage.setItem('inout', JSON.stringify(inout));
    window.location.href = "index2.html";
})

document.getElementById("out").addEventListener("click",function(){
    inout = "포장"
    localStorage.setItem('inout', JSON.stringify(inout));
    window.location.href = "index2.html";
})