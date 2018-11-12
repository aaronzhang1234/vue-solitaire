var startup_mixin = {
    methods:{
        get_deck(is_easy){
            if(is_easy){
                main_pile.is_easy = true;
            }else{
                main_pile.is_easy = false;
            }
            start_el.show_click_cards = false;

            start_el.show_loading = true;
             axios
             .get(base_url+'new/shuffle/')
             .then(function(response){
                start_el.deck_id = response.data.deck_id;
                start_game.place_cards_in_main();
             });

        },
        place_cards_in_main(){
            var promises = [];
            for(var i = 0; i<=51; i++){
                promises.push(axios.get(base_url+this.deck_id+'/draw/'));
            }
            axios.all(promises).then(function(results){
                results.forEach(function(response){
                    start_game.push_card(response);
                })
                for(var i =0; i<=6; i++){
                    for(var j =i; j>=0; j--){
                       if(j==0){
                           start_game.move_cards(i, true); 
                       }else{
                           start_game.move_cards(i, false); 
                       }
                    }
                }
                for(var i =0; i<main_pile.cards.length; i++){
                    main_pile.cards[i].active=true;
                }
                document.getElementById("start_screen").style.display="none";
                document.getElementById("game_on").style.display="";
                start_el.show_click_cards = true;
                start_el.show_loading = false;
            });
        },
        push_card(response, index){
             var card_info = response.data.cards[0];
             var card = {index:response.data.remaining, code:card_info.code, img:card_info.image, active:false};
             main_pile.cards.push(card);
        },
        move_cards(pile_num, is_active){
            var card = main_pile.cards.pop();
            if(is_active){
                card.active=true;
            }

            switch(pile_num){
                case 0:
                    pile_1.cards.push(card);
                    break;
                case 1:
                    pile_2.cards.push(card);
                    break;
                case 2:
                    pile_3.cards.push(card);
                    break;
                case 3:
                    pile_4.cards.push(card);
                    break;
                case 4:
                    pile_5.cards.push(card);
                    break;
                case 5:
                    pile_6.cards.push(card);
                    break;
                case 6:
                    pile_7.cards.push(card);
                    break;
            }
        }

    }
}
