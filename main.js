let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let search=document.getElementById('search');
let searchbytitle=document.getElementById('searchbytitle');
let searchbycategory=document.getElementById('searchbycategory'); 

let mood ='create';
let tmp;
// get total
function getTotal()
{
    if(price.value !='')
    {
       let result=(+price.value + +taxes.value + +ads.value)- +discount.value;
       total.innerHTML=result;
       total.style.background = 'rgb(161, 14, 14)';
    }else{
        total.innerHTML='';
        total.style.background = ' rgb(107, 18, 18)';
    }
}

// cerat product

let datapro;
if(localStorage.product !=null)
{
    datapro= JSON.parse( localStorage.product);
}
else{
    datapro=[];
}


submit.onclick=function()
{
    let newpro = {
    
     title:title.value.toLowerCase(),
     price:price.value,
     taxes:taxes.value,
     ads:ads.value,
     discount:discount.value,
     category:category.value.toLowerCase(),
     total:total.innerHTML,
     count:count.value
    
    }
   // count

   if(title.value !=''&&price.value!=''&&category.value!=''&&newpro.count<300){
  if(mood==='create'){
    if(newpro.count>0)
    {
        for(let i=0;i<newpro.count;i++)
        {
            datapro.push(newpro);
        }
    }else{
        datapro.push(newpro);
    }
   }else{
    datapro[tmp]=newpro;
    mood='create';
    count.style.display='block';
    submit.innerHTML='Create';
   }
cleardata()
}
    // save localStorage

    localStorage.setItem('product', JSON.stringify(datapro))

showData()

}  



function cleardata()
{
   title.value='';
   price.value='';
   taxes.value='';
   ads.value='';
   discount.value='';
   category.value='';
   count.value='';
   total.innerHTML='';
}
// read
function showData()
{
    
    getTotal();
    let table='';
    
    
    for(let i=0;i<datapro.length;i++)
    {
        table +=`
        <tr>
           <td>${i+1}</td>
           <td>${datapro[i].title}</td>
           <td>${datapro[i].price}</td>
           <td>${datapro[i].taxes}</td>
           <td>${datapro[i].ads}</td>
           <td>${datapro[i].discount}</td>
           <td>${datapro[i].total}</td>
           <td>${datapro[i].category}</td>
           <td><button id="update" onclick="updateData(${i})">update</button></td>
           <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        
        `
    }

    document.getElementById('tbody').innerHTML=table;
    let btnDelete=document.getElementById('deleteAll');
    if(datapro.length>0)
    {
        btnDelete.innerHTML=`<button onclick="deleteAll()">Delete All (${datapro.length})</button>`
    }else{
        btnDelete.innerHTML='';
        showData() 
    }
}
showData()



// delete
function deleteData(i)
{
  datapro.splice(i,1);
  localStorage.product=JSON.stringify(datapro);
  showData()
} 
function deleteAll()
{
  localStorage.clear();
  datapro=[];
  showData()
}
// update 
function updateData(i)
{
   title.value=datapro[i].title;
   price.value=datapro[i].price;
   taxes.value=datapro[i].taxes;
   ads.value=datapro[i].ads;
   discount.value=datapro[i].discount;
   category.value=datapro[i].category;
   getTotal();
   count.style.display="none";
   submit.innerHTML='Update';
   mood='update';
   tmp=i;
   scroll({
    top:0,
    behavior:"smooth",
   })
}


// search 
 
let searchMood='title';
function getSearchMood(id)
{
   if(id=='searchbytitle')
   {
    searchMood='title';
    search.placeholder='Search By Title';
   }else{
    searchMood='category';
    search.placeholder='Search By Category';
   }
   search.focus();
}


function searchData(value){
let table='';
    if(searchMood=='title')
    {
      for(let i=0;i<datapro.length;i++)
      {
         if(datapro[i].title.includes(value))
         {
            table +=`
            <tr>
               <td>${i+1}</td>
               <td>${datapro[i].title}</td>
               <td>${datapro[i].price}</td>
               <td>${datapro[i].taxes}</td>
               <td>${datapro[i].ads}</td>
               <td>${datapro[i].discount}</td>
               <td>${datapro[i].total}</td>
               <td>${datapro[i].category}</td>
               <td><button id="update" onclick="updateData(${i})">update</button></td>
               <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
            `
         }
      }


    }else{
        for(let i=0;i<datapro.length;i++)
        {
           if(datapro[i].category.includes(value))
           {
              table +=`
              <tr>
                 <td>${i+1}</td>
                 <td>${datapro[i].title}</td>
                 <td>${datapro[i].price}</td>
                 <td>${datapro[i].taxes}</td>
                 <td>${datapro[i].ads}</td>
                 <td>${datapro[i].discount}</td>
                 <td>${datapro[i].total}</td>
                 <td>${datapro[i].category}</td>
                 <td><button id="update" onclick="updateData(${i})">update</button></td>
                 <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
              </tr>
              `
           }
        }
    }

    document.getElementById('tbody').innerHTML=table;

}

// clean data 
window.onscroll=function()
{
    if(scrollY>=400)
{
    scrollbtn.style.display='block';
}else{
    scrollbtn.style.display='none';
}
}
let scrollbtn=document.getElementById('btnscroll');
scrollbtn.onclick=function()
{
    scroll({
        top:0,
        behavior:"smooth",
    })
}
