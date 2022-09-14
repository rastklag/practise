function filtre_vanilla() {
    let filterCateg = document.querySelector('#filter-categ').value;
    let mapping = {
        'avion': 'av',
        'bateau': 'bat',
        'vélo': undefined, // pour plus tard?
    };
    let classShown = mapping[filterCateg];
    document.querySelectorAll('tbody > tr').forEach((tr)=>{
        tr.style.display = 'none';
        if (tr.classList.contains(classShown)) tr.style.display = 'table-row';
    });

}

function filtre() {

        if(document.getElementById('filter-categ').value == 'avion') {
            $(".bat").hide()
            $(".av").show()
        }
        else if (document.getElementById('filter-categ').value == 'bateau') {
            $(".av").hide()
            $(".bat").show()

        }
        else if (document.getElementById('filter-categ').value == 'vélo') {
            $(".av").hide()
            $(".bat").hide()
        }
        else {
            $(".av").show()
             $(".bat").show()

        }

     }
