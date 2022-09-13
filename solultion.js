
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
