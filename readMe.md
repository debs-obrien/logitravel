# Logitravel
## Convert psd and add functionality
### HTML5, Bootstrap 4, SASS, Node, Express, Pug, Gulp


To run the app do the following and view on http://localhost:3000/
```node
npm install
npm start
http://localhost:3000/

```

![Screenshot](/screenShot.png)

### Example Code
```javascript
.cards
    if cards
        each card in cards
            .card
                .img-container.card-img-top
                    if(card.discount)
                        .corner-banner
                            span.discount -#{card.discount}%
                    img(src='images/'+ card.image + '.jpg', alt=card.place)
                    .img-text
                        span.top-text #{card.place}
                        span.bottom-text #{card.days} días / #{card.nights} noches
                        if(card.AI)
                            span.banner Todo Incluido
                .card-block
                    if(card.from)
                        p
                            i.from
                            b  #{card.from}
                    if(card.flight)
                        p
                            i.plane
                            | #{card.flight}
                            b  #{card.flightCompany}
```
#### By Debbie O'Brien
23 October 2017