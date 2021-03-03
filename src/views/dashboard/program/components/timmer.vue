<template>
    <vue-countdown-timer
      @start_callback="startCallBack('event started')"
      @end_callback="endCallBack('event ended')"
      :start-time="current"
      :interval="1000"
      :start-label="'Until start:'"
      :end-label="'Until end:'"
      label-position="begin"
      :end-text="'Event ended!'"
      :day-txt="'days'"
      :hour-txt="'hours'"
      :minutes-txt="'minutes'"
      :seconds-txt="'seconds'">
      <template slot="start-label" slot-scope="scope">
        <span style="color: red" v-if="scope.props.startLabel !== '' && scope.props.tips && scope.props.labelPosition === 'begin'">{{scope.props.startLabel}}:</span>
        <span style="color: blue" v-if="scope.props.endLabel !== '' && !scope.props.tips && scope.props.labelPosition === 'begin'">{{scope.props.endLabel}}:</span>
      </template>

      <template slot="countdown" slot-scope="scope">
        <span>{{scope.props.days}}</span><i>{{scope.props.dayTxt}}</i>
        <span>{{scope.props.hours}}</span><i>{{scope.props.hourTxt}}</i>
        <span>{{scope.props.minutes}}</span><i>{{scope.props.minutesTxt}}</i>
        <span>{{scope.props.seconds}}</span><i>{{scope.props.secondsTxt}}</i>
      </template>

      <template slot="end-label" slot-scope="scope">
        <span style="color: red" v-if="scope.props.startLabel !== '' && scope.props.tips && scope.props.labelPosition === 'end'">{{scope.props.startLabel}}:</span>
        <span style="color: blue" v-if="scope.props.endLabel !== '' && !scope.props.tips && scope.props.labelPosition === 'end'">{{scope.props.endLabel}}:</span>
      </template>

      <template slot="end-text" slot-scope="scope">
        <span style="color: green">{{ scope.props.endText}}</span>
      </template>
    </vue-countdown-timer>
</template>

<script >
export default {
  props: ["banner"],
  data(){
    return {
        current:(new Date).getTime() +10000,
    }
  },
  name: 'Timer',
  methods: {
    startCallBack: function(x) {
      console.log(x);
    },
    endCallBack: function(x) {
      console.log(x);
    },
  },
};
</script>