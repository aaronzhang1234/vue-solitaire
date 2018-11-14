var one_card_mixin = {
    computed:{
        card_margin:function(){
            if(this.playable_cards.length<=3){
                return 9;
            }else{
                return 0;
            }
        }
    },
    methods:{
        on_click:function(){
            let move;
            if(this.is_easy){
                if(this.cards.length<=0){
                    move = {type:"pile_remake", from_pile:null, to_pile:null, card_code:null, cards_got:null};
                    this.playable_cards.reverse();
                    this.cards = this.playable_cards;
                    this.playable_cards = []; 
                }else{
                    move = {type:"pile_click", from_pile:null, to_pile:null, card_code:null, cards_got:null};
                    var shuffle = new Audio('sounds/papershuffle.mp3');
                    shuffle.volume = .2;
                    shuffle.play();
                    this.playable_cards.push(this.cards.pop());
                }
            }else{
                if(this.cards.length<=0){
                    move = {type:"pile_remake", from_pile:null, to_pile:null, card_code:null, cards_got:null, playable_cards:this.playable_cards};
                    this.dark_cards.reverse();
                    this.cards = this.dark_cards;
                    this.dark_cards = [];
                    this.playable_cards = [];                    
                }else{
                    var shuffle = new Audio('sounds/papershuffle.mp3');
                    shuffle.volume = .2;
                    shuffle.play();
                    if(this.cards.length >=3){
                        move = {type:"pile_click", from_pile:null, to_pile:null, card_code:null, cards_got:3};
                        let getcards = this.cards.splice(-3);
                        this.playable_cards = this.playable_cards.concat(getcards);
                        getcards.reverse();
                        this.dark_cards = this.dark_cards.concat(getcards);
                    }else{
                        move = {type:"pile_click", from_pile:null, to_pile:null, card_code:null, cards_got:this.cards.length};
                        let getcards = this.cards.splice(0);
                        this.playable_cards = this.playable_cards.concat(getcards);
                        getcards.reverse();
                        this.dark_cards = this.dark_cards.concat(getcards);
                    }
                    if(this.arrayInside(this.playable_cards) || this.arrayInside(this.dark_cards)){
                        console.log("wee woo errors");
                    }
                }
            }
            undo_el.undos.push(move);
        },
        on_drag_start:function(e){
            e.dataTransfer.setData("card_id", this.playable_cards[this.playable_cards.length-1].code);
            e.dataTransfer.setData("from_pile", "playable_cards");   
        },
        arrayInside:function(cards){
            for(let i = 0; i<cards.length; i++){
                return Array.isArray(cards[i]);
            }
        }
    }
}

