	var a = 600;

window.onload=function() {
	makeTable();
	}

function whatDay(day) {
	
	switch (day)
		{
		case 0:
		  x="Sunday";
		  break;
		case 1:
		  x="Monday";
		  break;
		case 2:
		  x="Tuesday";
		  break;
		case 3:
		  x="Wednesday";
		  break;
		case 4:
		  x="Thursday";
		  break;
		case 5:
		  x="Friday";
		  break;
		case 6:
		  x="Saturday";
		  break;
		} 
	return x;
	}

function makeTable() {

	row=new Array();
	cell=new Array();
	date=new Array();

	var dat = new Date();

	row_num=a; //edit this value to suit
	cell_num=1; //edit this value to suit

	tab=document.createElement('table');
	tab.setAttribute('id','newtable');

	tbo=document.createElement('tbody');

	for(c=0;c<row_num;c++){
	row[c]=document.createElement('tr');

	date[c]= whatDay(dat.getDay()) + "\n" + dat.getDate() + "/" + (dat.getMonth()+1) + "/" + dat.getFullYear();
	dat.setDate(dat.getDate() + 1);
	
	
	
		for(k=0;k<cell_num;k++) {
		cell[k]=document.createElement('td');

		var bt = document.createElement('input');
		bt.type = 'button';
		bt.id = 'b' + c;
		bt.style.backgroundColor = 'transparent';
		bt.value = date[c];
		bt.style.width = 100;
		bt.onclick = changeColor;

		cell[k].appendChild(bt);
		row[c].appendChild(cell[k]);
		}
	
	tbo.appendChild(row[c]);
	}
	tab.appendChild(tbo);
	document.getElementById('mytable').appendChild(tab);
	}

function changeColor() {
	
	for(c=0;c<a;c++) {
	document.getElementById('b' + c).style.backgroundColor = 'transparent';
	}
	this.style.backgroundColor = 'red';
	

	}




