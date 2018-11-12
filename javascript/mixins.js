var playing_field_mixin={
    computed:{
        card_margin:function(){
            if(this.cards == null || this.cards.length<=7){
                return -7;
            }else if(this.cards.length>10){
                let margin_start = 7 - ((this.cards.length -10)*(4/18));               
                return -(margin_start+(.40*(this.cards.length-7)));
            }else{
                return -(7+(.40*(this.cards.length-7)));
            }
        },
        h1_margin:function(){
            if(this.cards.length == 0){
                return 8;
            }else{
                return -(this.card_margin) + 8;
            }
        }
    }, 
    methods:{
        drag_over:function(e){
            e.preventDefault();
        },
        on_drop:function(e){
            e.preventDefault();
            var from_pile = e.dataTransfer.getData("from_pile");
            var from_card_code = e.dataTransfer.getData("card_id");
            var to_pile = this.get_pile_name(e.toElement);
            var to_card_code = this.get_last_code(to_pile); 
            var correct_logic = this.is_correct_logic(to_card_code, from_card_code);
            if(correct_logic){ 
                this.add_card(to_pile, from_pile, from_card_code);
            }
        }, 
        get_last_code:function(pile_name){
            switch(pile_name){
                case 'pile_1':
                   if(pile_1.cards.length>0){
                       return pile_1.cards[(pile_1.cards.length)-1].code;
                   }else{
                       return "EE";
                   }
                   break;
                case 'pile_2':
                   if(pile_2.cards.length>0){
                       return pile_2.cards[(pile_2.cards.length)-1].code;
                   }else{
                       return "EE";
                   }
                   break;
                case 'pile_3':
                   if(pile_3.cards.length>0){
                       return pile_3.cards[(pile_3.cards.length)-1].code;
                   }else{
                       return "EE";
                   }
                   break;
                case 'pile_4':
                   if(pile_4.cards.length>0){
                       return pile_4.cards[(pile_4.cards.length)-1].code;
                   }else{
                       return "EE";
                   }
 
                   break;
                case 'pile_5':
                   if(pile_5.cards.length>0){
                       return pile_5.cards[(pile_5.cards.length)-1].code;
                   }else{
                       return "EE";
                   }
 
                   break;
                case 'pile_6':
                   if(pile_6.cards.length>0){
                       return pile_6.cards[(pile_6.cards.length)-1].code;
                   }else{
                       return "EE";
                   } 
                   break;
                case 'pile_7':
                   if(pile_7.cards.length>0){
                       return pile_7.cards[(pile_7.cards.length)-1].code;
                   }else{
                       return "EE";
                   } 
                   break;
            }
        },
        is_correct_logic:function(to_card_code, from_card_code){
            to_card_suit = to_card_code[1];
            from_card_suit = from_card_code[1];
            to_card_value = to_card_code[0];
            from_card_value = from_card_code[0];
            var is_correct_suits =  this.is_correct_suit(to_card_suit, from_card_suit);
            var is_correct_values = this.is_correct_value(to_card_value, from_card_value);
            if(is_correct_suits && is_correct_values){
                return true; 
            }
            return false;
        },
        is_correct_suit:function(to_card_suit, from_card_suit){
            if((from_card_suit=="H" || from_card_suit=="D") && (to_card_suit=="C" || to_card_suit=="S")){
                return true;
            }else if((from_card_suit=="C" || from_card_suit=="S") && (to_card_suit=="H" || to_card_suit=="D")){
                return true;
            }else if(to_card_suit=="E"){
                return true;
            }
            else{
                return false;
            }
            return false;
        },
        is_correct_value:function(to_card_value, from_card_value){
            var code_to_value = new Map([
                ['A' ,  1 ],
                ['2' ,  2 ],
                ['3' ,  3 ],
                ['4' ,  4 ],
                ['5' ,  5 ],
                ['6' ,  6 ],
                ['7' ,  7 ],
                ['8' ,  8 ],
                ['9' ,  9 ],
                ['0' , 10 ],
                ['J' , 11 ],
                ['Q' , 12 ],
                ['K' , 13 ],
                ['E' , 14 ]
            ])
            var to_card_num = code_to_value.get(to_card_value);
            var from_card_num = code_to_value.get(from_card_value);
            if(from_card_num == to_card_num-1){
                return true;
            }
            return false;
        },
        add_card:function(pile_name_to, pile_name_from, from_card_code){
            var shuffle = new Audio('sounds/papershuffle.mp3');
            shuffle.volume = .2;
            shuffle.play();
            let removed_data = this.get_card(pile_name_from, from_card_code)
            let cards_to_add = removed_data.cards_to_remove;
            let previous_active = removed_data.previous_active;
            console.log(previous_active);
            var move = {type:"move", from_pile:pile_name_from, to_pile:pile_name_to, card_code:from_card_code, cards_got:null, previously_active: previous_active};
            undo_el.undos.push(move); 
            switch(pile_name_to){
                case 'pile_1':
                   pile_1.cards = pile_1.cards.concat(cards_to_add); 
                   break;
                case 'pile_2':
                   pile_2.cards = pile_2.cards.concat(cards_to_add);
                   break;
                case 'pile_3':
                   pile_3.cards = pile_3.cards.concat(cards_to_add);
                   break;
                case 'pile_4':
                   pile_4.cards = pile_4.cards.concat(cards_to_add);
                   break;
                case 'pile_5':
                   pile_5.cards = pile_5.cards.concat(cards_to_add);
                   break;
                case 'pile_6':
                   pile_6.cards = pile_6.cards.concat(cards_to_add);
                   break;
                case 'pile_7':
                   pile_7.cards = pile_7.cards.concat(cards_to_add);
                   break;
            }
            
        },
        get_card:function(pile_name, from_card_code){
            var cards_to_remove;
            var previous_active = false;
            switch(pile_name){
                case 'playable_cards':
                   cards_to_remove= main_pile.playable_cards.pop();
                   for(var i =0; i<main_pile.dark_cards.length;i++){
                        if(main_pile.dark_cards[i].code == from_card_code){
                            main_pile.dark_cards.splice(i,1);
                        }
                   }
                   break;
                case 'pile_1':
                   var loc_of_card = this.get_card_location(pile_name, from_card_code);
                   cards_to_remove = pile_1.cards.splice(loc_of_card); 
                   if(pile_1.cards.length>0 && pile_1.cards[(pile_1.cards.length)-1].active != true){
                       pile_1.cards[(pile_1.cards.length)-1].active=true;
                       previous_active = true;
                   } 
                   break;
                case 'pile_2':
                   var loc_of_card = this.get_card_location(pile_name, from_card_code);
                   cards_to_remove = pile_2.cards.splice(loc_of_card); 
                   if(pile_2.cards.length>0 && pile_2.cards[(pile_2.cards.length)-1].active != true ){
                       previous_active = true;                      
                       pile_2.cards[(pile_2.cards.length)-1].active=true;
                   }
                   break;
                case 'pile_3':
                   var loc_of_card = this.get_card_location(pile_name, from_card_code);
                   cards_to_remove = pile_3.cards.splice(loc_of_card); 
                   if(pile_3.cards.length>0 &&  pile_3.cards[(pile_3.cards.length)-1].active != true){
                       previous_active = true;
                       pile_3.cards[(pile_3.cards.length)-1].active=true;
                   } 
                   break;
                case 'pile_4':
                   var loc_of_card = this.get_card_location(pile_name, from_card_code);
                   cards_to_remove = pile_4.cards.splice(loc_of_card); 
                   if(pile_4.cards.length>0 && pile_4.cards[(pile_4.cards.length)-1].active != true){
                       previous_active = true;
                       pile_4.cards[(pile_4.cards.length)-1].active=true;
                   } 
                   break;
                case 'pile_5':
                   var loc_of_card = this.get_card_location(pile_name, from_card_code);
                   cards_to_remove = pile_5.cards.splice(loc_of_card); 
                   if(pile_5.cards.length>0 && pile_5.cards[(pile_5.cards.length)-1].active != true){
                       previous_active = true;
                       pile_5.cards[(pile_5.cards.length)-1].active=true;
                   } 
                   break;
                case 'pile_6':
                   var loc_of_card = this.get_card_location(pile_name, from_card_code);
                   cards_to_remove = pile_6.cards.splice(loc_of_card); 
                   if(pile_6.cards.length>0 && pile_6.cards[(pile_6.cards.length)-1].active != true){
                       previous_active = true;
                       pile_6.cards[(pile_6.cards.length)-1].active=true;
                   } 
                   break;
                case 'pile_7':
                   var loc_of_card = this.get_card_location(pile_name, from_card_code);
                   cards_to_remove = pile_7.cards.splice(loc_of_card); 
                   if(pile_7.cards.length>0 && pile_7.cards[(pile_7.cards.length)-1].active != true){
                       previous_active = true;
                       pile_7.cards[(pile_7.cards.length)-1].active=true;
                   } 
                   break;
                case 'pile_spade':
                    cards_to_remove = pile_spade.cards.pop();
                    break;
                case 'pile_club':
                    cards_to_remove = pile_club.cards.pop();
                    break;
                case 'pile_diamond':
                    cards_to_remove = pile_diamond.cards.pop();
                    break;
                case 'pile_heart':
                    cards_to_remove = pile_heart.cards.pop();
                    break;
            }
            return {cards_to_remove:cards_to_remove, previous_active:previous_active};
        }
    }    
}

