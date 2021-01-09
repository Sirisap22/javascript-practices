const { hash } = window.location;

const meassge = atob(hash.replace("#", ""));

if (meassge) {
  document.querySelector("#message-form").classList.add("hide");
  document.querySelector("#message-show").classList.remove("hide");

  document.querySelector("h1").innerHTML = meassge;
}

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  document.querySelector("#message-form").classList.add("hide");
  document.querySelector("#link-form").classList.remove("hide");

  const input = document.querySelector("#message-input");
  const encrypted = btoa(input.value);

  const linkIput = document.querySelector("#link-input");
  linkIput.value = `${window.location}#${encrypted}`;
  linkIput.select();
});

/* 

encryption methodology -> base64 encoding -> built-in javascript 
called btoa(string) convert back is atob(string)

ASCII Character 's' 'e' 'c'
-> ASCII Character Code '115' '101' '99' 
-> 8 Digit binary representation of character '01110011' '01100101' '01100011'
-> All 24 digits joined together '011100110110010101100011'
-> Groups of 6 characters 011100 / 110110 / 010101 / 100011
-> Convert each group of 6 into a character 'c' '2' 'V' 'j'
-> Join characters together 'c2Vj's


*/
