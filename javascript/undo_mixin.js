var undo_mixin = {
    methods:{
        on_click(){
            if(this.undos.length!= 0){
                this.undo();               
            }else{
                console.log("nothing to undo");
            }
        },
        undo(){
            let move = this.undos.pop();
            switch(move.type){
                case "pile_click":
                    this.undo_click(move);            
                    break;
                case "pile_remake":
                    this.undo_pile(move);
                    break;
                case "move":
                    this.undo_move(move);
                    break;
                case "card_add_final":
                    this.undo_add_final(move)
                    break;
            }
        },
        undo_click(move){
            if(main_pile.is_easy){
                console.log(move);
                let card = main_pile.playable_cards.pop();
                main_pile.cards = main_pile.cards.concat(card);
            }else{
                let cards_got = move.cards_got;                
                console.log(cards_got);
                let undoed_cards = main_pile.playable_cards.splice(-(cards_got));
                main_pile.cards = main_pile.cards.concat(undoed_cards);
                main_pile.dark_cards.splice(-(cards_got));
            }
        },
        undo_pile(move){
            if(main_pile.is_easy){
                console.log('undo');
                main_pile.playable_cards = main_pile.cards;
                main_pile.cards = [];
            }else{
                main_pile.dark_cards = main_pile.cards.slice(0);
                main_pile.dark_cards.reverse();
                main_pile.playable_cards = move.playable_cards;
                /*
                while(main_pile.cards.length>0){
                    if(main_pile.cards.length>=3){
                        let cards = main_pile.cards.splice(-3);
                        main_pile.playable_cards = main_pile.playable_cards.concat(cards);
                    }else{
                        let cards = main_pile.cards.splice(0);
                        console.log(cards);
                        main_pile.playable_cards = main_pile.playable_cards.concat(cards);
                        main_pile.cards = [];
                    }
                }
                */
                main_pile.cards=[];
            }
        },
        undo_move(move){
            console.log("undo move");
            let from_pile = move.from_pile;
            let to_pile   = move.to_pile;
            let card_code = move.card_code;
            let previously_active = move.previously_active;  
            let card_loc = this.get_card_location(to_pile, card_code);
            let cards_to_add = this.get_card(to_pile, card_loc) 
            console.log(cards_to_add);
            this.add_card(from_pile, cards_to_add, previously_active);
        },
        get_card:function(pile_name, loc_of_card){
            var cards_to_remove;
            switch(pile_name){
                case 'pile_1':
                   cards_to_remove = pile_1.cards.splice(loc_of_card); 
                   break;
                case 'pile_2':
                   cards_to_remove = pile_2.cards.splice(loc_of_card); 
                   break;
                case 'pile_3':
                   cards_to_remove = pile_3.cards.splice(loc_of_card); 
                   break;
                case 'pile_4':
                   cards_to_remove = pile_4.cards.splice(loc_of_card); 
                   break;
                case 'pile_5':
                   cards_to_remove = pile_5.cards.splice(loc_of_card); 
                   break;
                case 'pile_6':
                   cards_to_remove = pile_6.cards.splice(loc_of_card); 
                   break;
                case 'pile_7':
                   cards_to_remove = pile_7.cards.splice(loc_of_card); 
                   break;
            }
            return cards_to_remove;
        },
        undo_add_final(move){
            console.log('undo final');
            let from_pile = move.from_pile;
            let to_pile   = move.to_pile;
            let card_code = move.card_code;
            let previously_active = move.previously_active;  
            let card;
            switch(to_pile){
                case 'pile_spade':
                   card = pile_spade.cards.pop(); 
                   break;
                case 'pile_club':
                   card = pile_club.cards.pop(); 
                   break;
                case 'pile_diamond':
                   card = pile_diamond.cards.pop(); 
                   break;
                case 'pile_heart':
                   card = pile_heart.cards.pop(); 
                   break;            
            }
            this.add_card(from_pile, card, previously_active);
        },
        add_card(from_pile, cards_to_add, previously_active){
           switch(from_pile){
               case 'playable_cards':
                   main_pile.playable_cards = main_pile.playable_cards.concat(cards_to_add);
                   main_pile.dark_cards.unshift(cards_to_add);
                   break;
               case 'pile_1':
                   if(previously_active){
                       console.log(pile_1.cards[pile_1.cards.length-1])
                       pile_1.cards[pile_1.cards.length-1].active = false;
                   }
                   pile_1.cards = pile_1.cards.concat(cards_to_add);
                   break;
               case 'pile_2':
                   if(previously_active){
                       console.log(pile_2.cards[pile_2.cards.length-1])
                       pile_2.cards[pile_2.cards.length-1].active = false;
                   }
                   pile_2.cards = pile_2.cards.concat(cards_to_add);
                   break;
               case 'pile_3':
                   if(previously_active){
                       console.log(pile_3.cards[pile_3.cards.length-1])
                       pile_3.cards[pile_3.cards.length-1].active = false;
                   }
                   pile_3.cards = pile_3.cards.concat(cards_to_add);
                  break;
               case 'pile_4':
                   if(previously_active){
                       console.log(pile_4.cards[pile_4.cards.length-1])
                       pile_4.cards[pile_4.cards.length-1].active = false;
                   }
                   pile_4.cards = pile_4.cards.concat(cards_to_add);
                  break;
               case 'pile_5':
                   if(previously_active){
                       console.log(pile_5.cards[pile_5.cards.length-1])
                       pile_5.cards[pile_5.cards.length-1].active = false;
                   }
                   pile_5.cards = pile_5.cards.concat(cards_to_add);
                  break;
               case 'pile_6':
                   if(previously_active){
                       console.log(pile_6.cards[pile_6.cards.length-1])
                       pile_6.cards[pile_6.cards.length-1].active = false;
                   }
                   pile_6.cards = pile_6.cards.concat(cards_to_add);
                  break;
               case 'pile_7':
                   if(previously_active){
                       console.log(pile_7.cards[pile_7.cards.length-1])
                       pile_7.cards[pile_7.cards.length-1].active = false;
                   }
                   pile_7.cards = pile_7.cards.concat(cards_to_add);
                  break;
           }
        }
    }
}
