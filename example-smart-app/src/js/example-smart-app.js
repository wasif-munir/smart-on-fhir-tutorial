(function(window){
  window.extractData = function(caller) {
    var ret = $.Deferred();

    function onError() {
      console.log('Loading error', arguments);
      ret.reject();
    }
    
    function onReadyGetPatResource(smart)  {
      alert ("example-smart-app.js > onReadyGetPatResource(smart) > L 11"); //wasif
      
      if (smart.hasOwnProperty('patient')) {
        var patient = smart.patient;
        //alert ("example-smart-app.js > L 13"); //wasif
        var pt = patient.read();
        //alert ("example-smart-app.js > L 15"); //wasif
        var obv;
        /*var obv = smart.patient.api.fetchAll({
                    type: 'Observation',
                    query: {
                      code: {
                        $or: ['http://loinc.org|8302-2', 'http://loinc.org|8462-4',
                              'http://loinc.org|8480-6', 'http://loinc.org|2085-9',
                              'http://loinc.org|2089-1', 'http://loinc.org|55284-4']
                      }
                    }
                  });
                  */
        
        //alert ("example-smart-app.js > L 28"); //wasif
        
        $.when(pt, obv).fail(onError);
        //alert ("example-smart-app.js > L 32"); //wasif
        $.when(pt, obv).done(function(patient, obv) {
          //alert ("example-smart-app.js > L 34 > obs by codes before"); //wasif
          //var byCodes = smart.byCodes(obv, 'code');
          //alert ("example-smart-app.js > L 36 > obs by byCodes after"); //wasif
          var gender = patient.gender;

          var fname = '';
          var lname = '';

          if (typeof patient.name[0] !== 'undefined') {
            fname = patient.name[0].given;
            lname = patient.name[0].family;
          }
          //alert ("example-smart-app.js > L 46 > before obs get"); //wasif
          //var height = byCodes('8302-2');
          //var systolicbp = getBloodPressureValue(byCodes('55284-4'),'8480-6');
          //var diastolicbp = getBloodPressureValue(byCodes('55284-4'),'8462-4');
          //var hdl = byCodes('2085-9');
          //var ldl = byCodes('2089-1');
          //alert ("example-smart-app.js > L 52 > after obs get"); //wasif
          var p = defaultPatient();
          p.birthdate = patient.birthDate;
          p.gender = gender;
          p.fname = fname;
          p.lname = lname;
          p.address = 'Dummary Address';
          if (typeof patient.address[0].text !== 'undefined') {
            p.address = patient.address[0].text;
          }
          //alert ("example-smart-app.js > L 62 > p.address " + p.address);
          if (p.address == 'Dummary Address'){
            //alert ('address is empty');
            
            if (typeof patient.address[0].line !== 'undefined') {
              p.address = patient.address[0].line;
            }
            if (typeof patient.address[0].city !== 'undefined') {
              p.address += ' ' + patient.address[0].city;
            }
            if (typeof patient.address[0].state !== 'undefined') {
              p.address += ' ' + patient.address[0].state;
            }
            if (typeof patient.address[0].postalCode !== 'undefined') {
              p.address += ' ' + patient.address[0].postalCode;
            }
          }

          //p.height = getQuantityValueAndUnit(height[0]);

          /*if (typeof systolicbp != 'undefined')  {
            p.systolicbp = systolicbp;
          }

          if (typeof diastolicbp != 'undefined') {
            p.diastolicbp = diastolicbp;
          }

          p.hdl = getQuantityValueAndUnit(hdl[0]);
          p.ldl = getQuantityValueAndUnit(ldl[0]);*/

          ret.resolve(p);
        });
      } else {
        alert ("Patient Context not found"); //wasif
        onError();
      }
    }

    function onReady(smart)  {
      alert ("example-smart-app.js > onReady(smart) > L 100"); //wasif
      
      if (smart.hasOwnProperty('patient')) {
        var patient = smart.patient;
        //alert ("example-smart-app.js > L 13"); //wasif
        var pt = patient.read();
        //alert ("example-smart-app.js > L 15"); //wasif
        var obv;
        var obv = smart.patient.api.fetchAll({
                    type: 'Observation',
                    query: {
                      code: {
                        $or: ['http://loinc.org|8302-2', 'http://loinc.org|8462-4',
                              'http://loinc.org|8480-6', 'http://loinc.org|55284-4']
                      }
                    }
                  });
        /*
        var obv = smart.patient.api.fetchAll({
                    type: 'Observation',
                    query: {
                      code: {
                        $or: ['http://loinc.org|8302-2', 'http://loinc.org|8462-4',
                              'http://loinc.org|8480-6', 'http://loinc.org|2085-9',
                              'http://loinc.org|2089-1', 'http://loinc.org|55284-4']
                      }
                    }
                  });
        */
        //alert ("example-smart-app.js > L 28"); //wasif
        if (obv == null) alert ("obv is null");

        var appt;
        var appt = smart.patient.api.fetchAll({
                    type: 'Appointment',
                    query: {
                      status: {
                        $or: ['proposed', 'pending',
                              'booked', 'arrived',
                              'fulfilled', 'cancelled']
                      }
                    }
                  });
        alert (appt);
        
        $.when(pt, obv).fail(onError);
        //alert ("example-smart-app.js > L 32"); //wasif
        $.when(pt, obv).done(function(patient, obv) {
          //alert ("example-smart-app.js > L 122 > obs by codes before"); //wasif
          var byCodes = smart.byCodes(obv, 'code');
          //alert ("example-smart-app.js > L 124 > obs by byCodes after"); //wasif
          var gender = patient.gender;

          var fname = '';
          var lname = '';

          if (typeof patient.name[0] !== 'undefined') {
            fname = patient.name[0].given;
            lname = patient.name[0].family;
          }
          //alert ("example-smart-app.js > L 134 > before obs get"); //wasif
          var height = byCodes('8302-2');
          var systolicbp = getBloodPressureValue(byCodes('55284-4'),'8480-6');
          var diastolicbp = getBloodPressureValue(byCodes('55284-4'),'8462-4');
          var hdl = byCodes('2085-9');
          var ldl = byCodes('2089-1');
          //alert ("example-smart-app.js > L 140 > after obs get"); //wasif
          var p = defaultPatient();
          p.birthdate = patient.birthDate;
          p.gender = gender;
          p.fname = fname;
          p.lname = lname;
          p.address = 'Dummary Address';
          if (typeof patient.address[0].text !== 'undefined') {
            p.address = patient.address[0].text;
          }
          //alert ("example-smart-app.js > L 150 > p.address " + p.address);
          if (p.address == 'Dummary Address'){
            //alert ('address is empty');
            
            if (typeof patient.address[0].line !== 'undefined') {
              p.address = patient.address[0].line;
            }
            if (typeof patient.address[0].city !== 'undefined') {
              p.address += ' ' + patient.address[0].city;
            }
            if (typeof patient.address[0].state !== 'undefined') {
              p.address += ' ' + patient.address[0].state;
            }
            if (typeof patient.address[0].postalCode !== 'undefined') {
              p.address += ' ' + patient.address[0].postalCode;
            }
          }

          p.height = getQuantityValueAndUnit(height[0]);

          if (typeof systolicbp != 'undefined')  {
            p.systolicbp = systolicbp;
          }

          if (typeof diastolicbp != 'undefined') {
            p.diastolicbp = diastolicbp;
          }

          p.hdl = getQuantityValueAndUnit(hdl[0]);
          p.ldl = getQuantityValueAndUnit(ldl[0]);

          ret.resolve(p);
        });
      } else {
        alert ("Patient Context not found"); //wasif
        onError();
      }
    }

    if (caller == "Pat") {
      FHIR.oauth2.ready(onReadyGetPatResource, onError);
    }
    else {
      FHIR.oauth2.ready(onReady, onError);
    }
    return ret.promise();

  };

  function defaultPatient(){
    return {
      fname: {value: ''},
      lname: {value: ''},
      gender: {value: ''},
      birthdate: {value: ''},
      address: {value: ''},
      height: {value: ''},
      systolicbp: {value: ''},
      diastolicbp: {value: ''},
      ldl: {value: ''},
      hdl: {value: ''},
    };
  }

  function getBloodPressureValue(BPObservations, typeOfPressure) {
    var formattedBPObservations = [];
    BPObservations.forEach(function(observation){
      var BP = observation.component.find(function(component){
        return component.code.coding.find(function(coding) {
          return coding.code == typeOfPressure;
        });
      });
      if (BP) {
        observation.valueQuantity = BP.valueQuantity;
        formattedBPObservations.push(observation);
      }
    });

    return getQuantityValueAndUnit(formattedBPObservations[0]);
  }

  function getQuantityValueAndUnit(ob) {
    if (typeof ob != 'undefined' &&
        typeof ob.valueQuantity != 'undefined' &&
        typeof ob.valueQuantity.value != 'undefined' &&
        typeof ob.valueQuantity.unit != 'undefined') {
          return ob.valueQuantity.value + ' ' + ob.valueQuantity.unit;
    } else {
      return undefined;
    }
  }

  window.drawVisualization = function(p) {
    $('#holder').show();
    $('#loading').hide();
    $('#fname').html(p.fname);
    $('#lname').html(p.lname);
    $('#gender').html(p.gender);
    $('#birthdate').html(p.birthdate);
    $('#address').html(p.address);
    $('#height').html(p.height);
    $('#systolicbp').html(p.systolicbp);
    $('#diastolicbp').html(p.diastolicbp);
    $('#ldl').html(p.ldl);
    $('#hdl').html(p.hdl);
  };

})(window);
