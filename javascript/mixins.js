var playing_field_mixin={
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
            console.log(to_card_code);
            console.log(from_card_code);
            var correct_logic = this.is_correct_logic(to_card_code, from_card_code);
            if(correct_logic){ 
                this.add_card(to_pile, from_pile, from_card_code);
            }
        }, 
        get_pile_name:function(element){
            while(element){ 
                if(element.id!=null && (element.id).substring(0,4)=="pile"){
                    return element.id
                }
                element = element.parentElement;
            }
            return element.id;
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
            var cards_to_add = this.get_card(pile_name_from, from_card_code)
            console.log(cards_to_add);
            switch(pile_name_to){
                case 'pile_1':
                   pile_1.cards = pile_1.cards.concat(cards_to_add); 
                   console.log(pile_1.cards);
                   break;
                case 'pile_2':
                   pile_2.cards = pile_2.cards.concat(cards_to_add);
                   console.log(pile_2.cards);

                   break;
                case 'pile_3':
                   pile_3.cards = pile_3.cards.concat(cards_to_add);
                   console.log(pile_3.cards);

                   break;
                case 'pile_4':
                   pile_4.cards = pile_4.cards.concat(cards_to_add);
                   console.log(pile_4.cards);

                   break;
                case 'pile_5':
                   pile_5.cards = pile_5.cards.concat(cards_to_add);
                   console.log(pile_5.cards);

                   break;
                case 'pile_6':
                   pile_6.cards = pile_6.cards.concat(cards_to_add);
                   console.log(pile_6.cards);

                   break;
                case 'pile_7':
                   pile_7.cards = pile_7.cards.concat(cards_to_add);
                   console.log(pile_7.cards);

                   break;
            }
            
        },
        get_card:function(pile_name, from_card_code){
            var cards_to_remove;
            switch(pile_name){
                case 'playable_cards':
                   cards_to_remove= main_pile.playable_cards.pop();
                   break;
                case 'pile_1':
                   var loc_of_card = this.get_card_location(pile_name, from_card_code);
                   cards_to_remove = pile_1.cards.splice(loc_of_card); 
                   if(pile_1.cards.length>0){
                       pile_1.cards[(pile_1.cards.length)-1].active=true;
                   } 
                   break;
                case 'pile_2':
                   var loc_of_card = this.get_card_location(pile_name, from_card_code);
                   cards_to_remove = pile_2.cards.splice(loc_of_card); 
                   if(pile_2.cards.length>0){
                       pile_2.cards[(pile_2.cards.length)-1].active=true;
                   }
                   break;
                case 'pile_3':
                   var loc_of_card = this.get_card_location(pile_name, from_card_code);
                   cards_to_remove = pile_3.cards.splice(loc_of_card); 
                   if(pile_3.cards.length>0){
                       pile_3.cards[(pile_3.cards.length)-1].active=true;
                   } 
                   break;
                case 'pile_4':
                   var loc_of_card = this.get_card_location(pile_name, from_card_code);
                   cards_to_remove = pile_4.cards.splice(loc_of_card); 
                   if(pile_4.cards.length>0){
                       pile_4.cards[(pile_4.cards.length)-1].active=true;
                   } 
                   break;
                case 'pile_5':
                   var loc_of_card = this.get_card_location(pile_name, from_card_code);
                   cards_to_remove = pile_5.cards.splice(loc_of_card); 
                   if(pile_5.cards.length>0){
                       pile_5.cards[(pile_5.cards.length)-1].active=true;
                   } 
                   break;
                case 'pile_6':
                   var loc_of_card = this.get_card_location(pile_name, from_card_code);
                   cards_to_remove = pile_6.cards.splice(loc_of_card); 
                   if(pile_6.cards.length>0){
                       pile_6.cards[(pile_6.cards.length)-1].active=true;
                   } 
                   break;
                case 'pile_7':
                   var loc_of_card = this.get_card_location(pile_name, from_card_code);
                   cards_to_remove = pile_7.cards.splice(loc_of_card); 
                   if(pile_7.cards.length>0){
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
            console.log(cards_to_remove);
            return cards_to_remove;
        },
        get_card_location:function(pile_name, from_card_code){
            switch(pile_name){
                case 'pile_1':
                    for(var i=0; i<pile_1.cards.length;i++){
                        if(pile_1.cards[i].code == from_card_code){
                            return i;
                        }
                    }
                    return -1;
                    break;
                case 'pile_2':
                    for(var i=0; i<pile_2.cards.length;i++){
                        if(pile_2.cards[i].code == from_card_code){
                            return i;
                        }
                    }
                    return -1;
                    break;
                case 'pile_3':
                    for(var i=0; i<pile_3.cards.length;i++){
                        if(pile_3.cards[i].code == from_card_code){
                            return i;
                        }
                    }
                    return -1;
                    break;
                case 'pile_4':
                    for(var i=0; i<pile_4.cards.length;i++){
                        if(pile_4.cards[i].code == from_card_code){
                            return i;
                        }
                    }
                    return -1;
                    break;
                case 'pile_5':
                    for(var i=0; i<pile_5.cards.length;i++){
                        if(pile_5.cards[i].code == from_card_code){
                            return i;
                        }
                    }
                    return -1;
                    break;
                case 'pile_6':
                    for(var i=0; i<pile_6.cards.length;i++){
                        if(pile_6.cards[i].code == from_card_code){
                            return i;
                        }
                    }
                    return -1;
                    break;
                case 'pile_7':
                    for(var i=0; i<pile_7.cards.length;i++){
                        if(pile_7.cards[i].code == from_card_code){
                            return i;
                        }
                    }
                    return -1;
                    break;
            }
        }
    }    
}

