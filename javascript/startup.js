var startup_mixin = {
    methods:{
        get_deck(){
            axios
             .get(base_url+'new/shuffle/')
             .then(function(response){
                console.log('hello');
                console.log(response);
                obj.deck_id = response.data.deck_id;
                app1.place_cards_in_main();
             });

        },
        place_cards_in_main(){
            var promises = [];
            for(var i = 0; i<=51; i++){
                promises.push(axios.get(base_url+this.deck_id+'/draw/'));
            }
            axios.all(promises).then(function(results){
                results.forEach(function(response){
                    app1.push_card(response);
                })
                for(var i =0; i<=6; i++){
                    for(var j =i; j>=0; j--){
                       if(j==0){
                           app1.move_cards(i, true); 
                       }else{
                           app1.move_cards(i, false); 
                       }
                    }
                }
                for(var i =0; i<main_pile.cards.length; i++){
                    main_pile.cards[i].active=true;
                }
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
