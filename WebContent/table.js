
function showPosition(j,i) {
	
	document.getElementById('b3').innerHTML= 'j + i';
}
function changeColor() {
	
	if (document.getElementById('b2').style.backgroundColor == 'blue') {
	document.getElementById('b2').style.backgroundColor = 'red';
	} else {
	document.getElementById('b2').style.backgroundColor = 'blue';
	}
}

window.onload=function() {
	makeTable();
	}

	function makeTable() {

	row=new Array();
	cell=new Array();
	
	var buttonnode= document.createElement('button');

	row_num=12; //edit this value to suit
	cell_num=12; //edit this value to suit

	tab=document.createElement('table');
	tab.setAttribute('id','newtable');

	tbo=document.createElement('tbody');

	for(c=0;c<row_num;c++){
	row[c]=document.createElement('tr');
	
	
		for(k=0;k<cell_num;k++) {
		cell[k]=document.createElement('td');
		
		buttonnode.setAttribute('type','button');
		buttonnode.setAttribute('name','sal');
		buttonnode.setAttribute('value','sal');
		buttonnode.attachEvent('onclick', 'showPosition(c,k)');
		
		cont=document.createTextNode((c+1)*(k+1));
		cell[k].appendChild(cont);
		row[c].appendChild(cell[k]);
		}
	
	tbo.appendChild(row[c]);
	}
	tab.appendChild(tbo);
	document.getElementById('mytable').appendChild(tab);
	}
