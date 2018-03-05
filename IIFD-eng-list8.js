1009,// 'preload' should be the first item in the shuffle sequence so that images are preloaded
// before any other items are displayed.

var shuffleSequence = seq(
                             "preload",
                             "taskdescrip",
                             "famknown",
                             "singleprem",
                              randomize("prac_single"),
                             "doubleprem",
                             randomize("prac_double"),
                             "start",
                                "68.01", "68.02", "68.03", "68.04", "68.05", "68.06", "68.07", "68.08", "68.09", "68.10",
                                "68.11", "68.12", "68.13", "68.14", "68.15", "68.16", "68.17", "68.18", "68.19", "68.20",
                                "68.21", "68.22", "68.23", "68.24", "68.25", "68.26", "68.27", "68.28", "68.29", "68.30",
                                "68.31", "68.32", "68.33", "68.34", "68.35", "68.36", "68.37", "68.38", "68.39", "68.40",
                                "68.41", "68.42", "68.43", "68.44", "68.45", "68.46", "68.47", "68.48", "68.49", "68.50",
                            );


var defaults = [
    "Separator", {
        transfer: 1000,
        normalMessage: "Please wait for the next sentence.",
        errorMessage: "Wrong. Please wait for the next sentence."
    },
    "NextMessage", {hideProgressBar: true,
    },
    "PracticeMessage", {hideProgressBar: true,
    },
    "StartMessage", {hideProgressBar: true,
    },
    "PictureAccept", {
      hideProgressBar: true,
      randomOrder: false
    },
    "Question", {
        hideProgressBar: true,
        hasCorrect: false,
        randomOrder: false
    },
    "FlashSentence", {
        hideProgressBar: true,
        timeout: 5000
    },
    "MyDashedSentence", {
        hideProgressBar: true,
        mode: "self-paced reading",
        display: "in place",
        hideUnderscores: false,
        blankText: "\u0020\u0020"
    },
    "DashedSentence", {
        hideProgressBar: true,
        mode: "self-paced reading",
        display: "in place",
        hideUnderscores: false,
        blankText: "\u0020\u0020"
    },
    "Message", {
        hideProgressBar: true
    },
    "Form", {
        hideProgressBar: true,
        continueOnReturn: true,
        saveReactionTime: true
    }
];

// ========== START OF CODE TO COPY INTO YOUR DATA FILE ==========
var IMAGES_TO_PRELOAD = [

    "https://imgur.com/CKEa3Zr.png", // 8-4c0s -   every-circle,                 conj & known conditions
    "https://imgur.com/EhOp8QM.png", // 8-0c3s -   three-square,                 conj & known conditions
    "https://imgur.com/d9htci3.png", // 8-4c3s -   every-circle / three-square,  conj condition

    "https://imgur.com/eQh40x2.png", // 8-2c3s -   every-circle,                 known & unknown conditions
    "https://imgur.com/zIUwK4N.png", // 8-4c2s -   three-square,                 known & unknown conditions

    "https://imgur.com/VAObTsD.png", // 8-0c4s -   every-square,                 conj & known conditions
    "https://imgur.com/mnzhSDj.png", // 8-3c0s -   three-circle,                 conj & known conditions
    "https://imgur.com/mKarxSv.png", // 8-3c4s -   every-square / three-circle,  conj condition

    "https://imgur.com/KduS46H.png", // 8-3c2s -   every-square,                 known & unknown conditions
    "https://imgur.com/M6bF0FW.png", // 8-2c4s -   three-circle,                 known & unknown conditions

    "https://imgur.com/szZ1mVE.png", // 8-1c2s-control
    "https://imgur.com/wkDVZgd.png", // 8-1c3s-control
    "https://imgur.com/zXTKjiQ.png", // 8-2c2s-control
    "https://imgur.com/yv9ULuj.png", // 8-4c4s-control


];

define_ibex_controller({
    name: "Preloader",
    jqueryWidget: {
        _init: function () {
            this.element.append("Loading images...");

            this.preloadedImages = [ ];
            var numToPreload = IMAGES_TO_PRELOAD.length;
            for (var i = 0; i < IMAGES_TO_PRELOAD.length; ++i) {
                var img = new Image();
                img.src = IMAGES_TO_PRELOAD[i];
                var self = this;
                img.onload = function () {
                    --numToPreload;
                    if (numToPreload == 0) {
                        self.options._finishedCallback([ ]);
                    }
                }
                this.preloadedImages.push(img);
            }
        }
    },
    properties: {
        countsForProgressBar: false
    }
});
// ========= END OF CODE TO COPY INTO YOUR DATA FILE ==========

var items = [

    // Define the 'preload' item.
    ["preload", "Preloader", { }],

    ["sep", "Separator", { }],

    ["setcounter", "__SetCounter__", { }],

    ["taskdescrip","NextMessage", {html: {include: 'iifd_task.html'}}],

    ["famknown","NextMessage", {html: {include: 'iifd_known_sample.html'}}],

    ["singleprem","PracticeMessage", {html: {include: 'iifd_introduce_single.html'}}],

    ["doubleprem","PracticeMessage", {html: {include: 'iifd_introduce_double.html'}}],

    ["start","StartMessage", {html: {include: 'iifd_start.html'}}],

    ["prac_single", //every shape: choice between 4c4s (correct, left) and 2c2s (wrong, right)
                "Message",        {html: {include: 'iifd_eng_practice_first_every_shape.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/wkDVZgd.png"], //4c4s - true
                                        ["K","https://imgur.com/zXTKjiQ.png"]]}],//2c2s - false
    ["prac_single", //three squares: choice between 1c3s (correct, right) and 1c2s (wrong, left)
                "Message",        {html: {include: 'iifd_eng_practice_first_three_squares.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/szZ1mVE.png"], //1c2s - false
                                        ["K","https://imgur.com/yv9ULuj.png"]]}], //1c3s - true
    ["prac_double", //one or four circles, every shape: choice between 4c4s (correct, right) and 1c2s (wrong, left)
                "Message",        {html: {include: 'iifd_eng_practice_first_one_circles_four_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_practice_second_every_shape.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/szZ1mVE.png"], //1c2s - false
                                        ["K","https://imgur.com/wkDVZgd.png"]]}], //4c4s - true
    ["prac_double", //two or three squares, two circles : choice between 2c2s (correct, left) and 1c3s (wrong, right)
                "Message",        {html: {include: 'iifd_eng_practice_first_two_squares_three_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_practice_second_two_circles.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/zXTKjiQ.png"], //2c2s - true
                                        ["K","https://imgur.com/yv9ULuj.png"]]}], //1c3s- false

      // condition names: #-premiseorder-P1-disjunctorder-P2-Ashape-imageset-Afallaciousimageside

      //list2 - premises canonical order / every or three / trial order A / image order B
          //trials: 1 block:  1147, 1130, 1042, 1160, 1066, 1118, 1034, 1122, 1054, 1137,
          //        2 block:  1104, 1078, 1152, 1028, 1135, 1072, 1108, 1156, 1133, 1062,
          //        3 block:  1132, 1082, 1012, 1112, 1046, 1144, 1052, 1145, 1024, 1141,
          //        4 block:  1006, 1092, 1086, 1125, 1100, 1002, 1032, 1076, 1114, 1157,
          //        5 block:  1140, 1060, 1123, 1150, 1038, 1016, 1094, 1020, 1128, 1153

      ["68.01",   //1147-onlyP2-noP1-na-someB-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["--K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      ["68.02",   //1130-onlyP2-noP1-na-someB-circle-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["--K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      ["68.03",   //1042-canonical-disj-Bfirst-someA-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle_.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["--K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      ["68.04",   //1160-onlyP2-noP1-na-someB-square-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["--K","https://imgur.com/KduS46H.png"]]}], //3c2s
      ["68.05",   //1066-canonical-disj-Bfirst-someA-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle_.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["--K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      ["68.06",   //1118-onlyP1-disj-Bfirst-noP2-square-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square_.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["--K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      ["68.07",   //1034-canonical-disj-Bfirst-someB-circle-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle_.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["--K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      ["68.08",   //1122-onlyP2-noP1-na-someB-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["--K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      ["68.09",   //1054-canonical-disj-Bfirst-someA-square-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square_.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["--K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      ["68.10",   //1137-onlyP2-noP1-na-someB-circle-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["--K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      ["68.11",   //1104-onlyP1-disj-Bfirst-noP2-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square_.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["--K","https://imgur.com/KduS46H.png"]]}], //3c2s
      ["68.12",   //1078-canonical-disj-Bfirst-someA-square-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square_.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["--K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      ["68.13",   //1152-onlyP2-noP1-na-someB-square-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["--K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      ["68.14",   //1028-canonical-disj-Bfirst-someB-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle_.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["--K","https://imgur.com/d9htci3.png"]]}], //4c3s
      ["68.15",   //1135-onlyP2-noP1-na-someB-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["--K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      ["68.16",   //1072-canonical-disj-Bfirst-someA-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square_.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["--K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      ["68.17",   //1108-onlyP1-disj-Bfirst-noP2-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle_.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["--K","https://imgur.com/d9htci3.png"]]}], //4c3s
      ["68.18",   //1156-onlyP2-noP1-na-someB-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["--K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      ["68.19",   //1133-onlyP2-noP1-na-someB-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["--K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      ["68.20",   //1062-canonical-disj-Bfirst-someA-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square_.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["--K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      ["68.21",   //1132-onlyP2-noP1-na-someB-square-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["--K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      ["68.22",   //1082-onlyP1-disj-Bfirst-noP2-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle_.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["--K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      ["68.23",   //1012-canonical-disj-Bfirst-someB-circle-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle_.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["--K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      ["68.24",   //1112-onlyP1-disj-Bfirst-noP2-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square_.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["--K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      ["68.25",   //1046-canonical-disj-Bfirst-someA-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square_.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["--K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      ["68.26",   //1144-onlyP2-noP1-na-someA-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["--K","https://imgur.com/KduS46H.png"]]}], //3c2s
      ["68.27",   //1052-canonical-disj-Bfirst-someA-circle-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle_.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["--K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      ["68.28",   //1145-onlyP2-noP1-na-someB-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["--K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      ["68.29",   //1024-canonical-disj-Bfirst-someB-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square_.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["--K","https://imgur.com/KduS46H.png"]]}], //3c2s
      ["68.30",   //1141-onlyP2-noP1-na-someA-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["--K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      ["68.31",   //1006-canonical-disj-Bfirst-someB-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square_.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["--K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      ["68.32",   //1092-onlyP1-disj-Bfirst-noP2-circle-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle_.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["--K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      ["68.33",   //1086-onlyP1-disj-Bfirst-noP2-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square_.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["--K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      ["68.34",   //1125-onlyP2-noP1-na-someB-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["--K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      ["68.35",   //1100-onlyP1-disj-Bfirst-noP2-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle_.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["--K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      ["68.36",   //1002-canonical-disj-Bfirst-someB-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle_.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["--K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      ["68.37",   //1032-canonical-disj-Bfirst-someB-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square_.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["--K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      ["68.38",   //1076-canonical-disj-Bfirst-someA-circle-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle_.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["--K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      ["68.39",   //1114-onlyP1-disj-Bfirst-noP2-circle-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle_.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["--K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      ["68.40",   //1157-onlyP2-noP1-na-someB-circle-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["--K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      ["68.41",   //1140-onlyP2-noP1-na-someB-square-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["--K","https://imgur.com/KduS46H.png"]]}], //3c2s
      ["68.42",   //1060-canonical-disj-Bfirst-someA-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle_.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["--K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      ["68.43",   //1123-onlyP2-noP1-na-someB-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["--K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      ["68.44",   //1150-onlyP2-noP1-na-someB-circle-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["--K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      ["68.45",   //1038-canonical-disj-Bfirst-someB-square-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square_.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["--K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      ["68.46",   //1016-canonical-disj-Bfirst-someB-square-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square_.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["--K","https://imgur.com/KduS46H.png"]]}], //3c2s
      ["68.47",   //1094-onlyP1-disj-Bfirst-noP2-square-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square_.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["--K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      ["68.48",   //1020-canonical-disj-Bfirst-someB-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle_.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["--K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      ["68.49",   //1128-onlyP2-noP1-na-someB-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["--K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      ["68.50",   //1153-onlyP2-noP1-na-someB-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["--K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s



];
