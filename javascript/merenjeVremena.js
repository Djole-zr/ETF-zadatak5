function merenjeVremena () {
    let vreme = parseInt(localStorage.getItem('vreme'));
    if(vreme) {
        setInterval(() => {
           vreme++;
           console.log(vreme);
           localStorage.setItem('vreme', vreme)
           alert(`${vreme} minuta ste proveli na stranici`);
        }, 60000);

    } else {
        setTimeout(() => {
            localStorage.setItem('vreme', 1);
            alert('1 minut ste proveli na stranici');
            merenjeVremena();          
        }, 60000);
    }
}

window.onload = function() {
    merenjeVremena();
  };