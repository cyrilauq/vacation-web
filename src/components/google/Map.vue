<template>
    <GMapMap
        :center="center"
        :zoom="zoom" 
        map-type-id="terrain" 
        style="width: auto; height: 15rem"
        :options="{
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: true,
            rotateControl: true,
            fullscreenControl: true
        }"
    >      
        <GMapMarker
            :position="center"
            :clickable="true"
            :draggable="false"
        />
    </GMapMap>
</template>

<script>
    export default {
        name: "Map",
        props: {
            zoom: {
                type: Number,
                required: true,
                default: 15
            },
            center: {
                type: Object,
                required: true,
                default: { lat: 0, lnt: 0 }
            }
        }
    }
</script>