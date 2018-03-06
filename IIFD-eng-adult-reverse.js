// 'preload' should be the first item in the shuffle sequence so that images are preloaded
// before any other items are displayed.

var shuffleSequence = seq(
                             "preload",
                             "time",
                             "taskdescrip",
                             "time",
                             "famknown",
                             "time",
                             "singleprem",
                             "time",
                              randomize("prac_single", "time"),
                             "doubleprem",
                             "time",
                              randomize("prac_double", "time"),
                             "time",
                             randomize("test","time")

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
    },
    "MyTime", {
        hideProgressBar: true
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

    ["time", "MyTime", { }]

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


      // item names: #-premiseorder-P1-disjunctorder-P2-Ashape-imageset-Afallaciousimageside

      [["test", 21],   //1081-onlyP1-disj-Afirst-noP2-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 21],   //1082-onlyP1-disj-Bfirst-noP2-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 21],   //1083-onlyP1-disj-Afirst-noP2-circle-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 21],   //1084-onlyP1-disj-Bfirst-noP2-circle-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 22],   //1085-onlyP1-disj-Afirst-noP2-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 22],   //1086-onlyP1-disj-Bfirst-noP2-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 22],   //1087-onlyP1-disj-Afirst-noP2-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 22],   //1088-onlyP1-disj-Bfirst-noP2-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 23],   //1089-onlyP1-disj-Afirst-noP2-circle-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 23],   //1090-onlyP1-disj-Bfirst-noP2-circle-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 23],   //1091-onlyP1-disj-Afirst-noP2-circle-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 23],   //1092-onlyP1-disj-Bfirst-noP2-circle-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 24],   //1093-onlyP1-disj-Afirst-noP2-square-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 24],   //1094-onlyP1-disj-Bfirst-noP2-square-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 24],   //1095-onlyP1-disj-Afirst-noP2-square-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 24],   //1096-onlyP1-disj-Bfirst-noP2-square-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 25],   //1097-onlyP1-disj-Afirst-noP2-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 25],   //1098-onlyP1-disj-Bfirst-noP2-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 25],   //1099-onlyP1-disj-Afirst-noP2-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 25],   //1100-onlyP1-disj-Bfirst-noP2-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 26],   //1101-onlyP1-disj-Afirst-noP2-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 26],   //1102-onlyP1-disj-Bfirst-noP2-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 26],   //1103-onlyP1-disj-Afirst-noP2-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 26],   //1104-onlyP1-disj-Bfirst-noP2-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 27],   //1105-onlyP1-disj-Afirst-noP2-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 27],   //1106-onlyP1-disj-Bfirst-noP2-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 27],   //1107-onlyP1-disj-Afirst-noP2-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 27],   //1108-onlyP1-disj-Bfirst-noP2-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 28],   //1109-onlyP1-disj-Afirst-noP2-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 28],   //1110-onlyP1-disj-Bfirst-noP2-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 28],   //1111-onlyP1-disj-Afirst-noP2-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 28],   //1112-onlyP1-disj-Bfirst-noP2-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 29],   //1113-onlyP1-disj-Afirst-noP2-circle-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 29],   //1114-onlyP1-disj-Bfirst-noP2-circle-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 29],   //1115-onlyP1-disj-Afirst-noP2-circle-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 29],   //1116-onlyP1-disj-Bfirst-noP2-circle-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 30],   //1117-onlyP1-disj-Afirst-noP2-square-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 30],   //1118-onlyP1-disj-Bfirst-noP2-square-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 30],   //1119-onlyP1-disj-Afirst-noP2-square-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 30],   //1120-onlyP1-disj-Bfirst-noP2-square-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 31],   //1121-onlyP2-noP1-na-someB-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 31],   //1122-onlyP2-noP1-na-someB-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 32],   //1123-onlyP2-noP1-na-someB-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 32],   //1124-onlyP2-noP1-na-someB-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 33],   //1125-onlyP2-noP1-na-someB-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 33],   //1126-onlyP2-noP1-na-someB-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 34],   //1127-onlyP2-noP1-na-someB-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 34],   //1128-onlyP2-noP1-na-someB-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 35],   //1129-onlyP2-noP1-na-someB-circle-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 35],   //1130-onlyP2-noP1-na-someB-circle-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 36],   //1131-onlyP2-noP1-na-someB-square-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 36],   //1132-onlyP2-noP1-na-someB-square-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 37],   //1133-onlyP2-noP1-na-someB-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 37],   //1134-onlyP2-noP1-na-someB-circle-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 38],   //1135-onlyP2-noP1-na-someB-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 38],   //1136-onlyP2-noP1-na-someB-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 39],   //1137-onlyP2-noP1-na-someB-circle-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 39],   //1138-onlyP2-noP1-na-someB-circle-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 40],   //1139-onlyP2-noP1-na-someB-square-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 40],   //1140-onlyP2-noP1-na-someB-square-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 41],   //1141-onlyP2-noP1-na-someA-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 41],   //1142-onlyP2-noP1-na-someA-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 42],   //1143-onlyP2-noP1-na-someA-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 42],   //1144-onlyP2-noP1-na-someA-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 43],   //1145-onlyP2-noP1-na-someB-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 43],   //1146-onlyP2-noP1-na-someB-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 44],   //1147-onlyP2-noP1-na-someB-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 44],   //1148-onlyP2-noP1-na-someB-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 45],   //1149-onlyP2-noP1-na-someB-circle-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 45],   //1150-onlyP2-noP1-na-someB-circle-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 46],   //1151-onlyP2-noP1-na-someB-square-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 46],   //1152-onlyP2-noP1-na-someB-square-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 47],   //1153-onlyP2-noP1-na-someB-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 47],   //1154-onlyP2-noP1-na-someB-circle-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 48],   //1155-onlyP2-noP1-na-someB-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 48],   //1156-onlyP2-noP1-na-someB-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 49],   //1157-onlyP2-noP1-na-someB-circle-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 49],   //1158-onlyP2-noP1-na-someB-circle-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 50],   //1159-onlyP2-noP1-na-someB-square-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 50],   //1160-onlyP2-noP1-na-someB-square-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 51],   //1161-reverse-disj-Afirst-someB-circle-conjunctiveA-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_circle_three_squares.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                        ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 51],   //1162-reverse-disj-Bfirst-someB-circle-conjunctiveA-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_squares_every_circle.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                        ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 51],   //1163-reverse-disj-Afirst-someB-circle-conjunctiveA-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_circle_three_squares.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                        ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 51],   //1164-reverse-disj-Bfirst-someB-circle-conjunctiveA-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_squares_every_circle.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                        ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 52],   //1165-reverse-disj-Afirst-someB-square-conjunctiveA-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_square_three_circles.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                        ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 52],   //1166-reverse-disj-Bfirst-someB-square-conjunctiveA-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_circles_every_square.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                        ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 52],   //1167-reverse-disj-Afirst-someB-square-conjunctiveA-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_square_three_circles.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                        ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 52],   //1168-reverse-disj-Bfirst-someB-square-conjunctiveA-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_circles_every_square.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                        ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 53],   //1169-reverse-disj-Afirst-someB-circle-knownA-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_circle_three_squares.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                        ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 53],   //1170-reverse-disj-Bfirst-someB-circle-knownA-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_squares_every_circle.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                        ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 53],   //1171-reverse-disj-Afirst-someB-circle-knownA-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_circle_three_squares.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                        ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 53],   //1172-reverse-disj-Bfirst-someB-circle-knownA-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_squares_every_circle.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                        ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 54],   //1173-reverse-disj-Afirst-someB-square-knownA-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_square_three_circles.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                        ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 54],   //1174-reverse-disj-Bfirst-someB-square-knownA-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_circles_every_square.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                        ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 54],   //1175-reverse-disj-Afirst-someB-square-knownA-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_square_three_circles.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                        ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 54],   //1176-reverse-disj-Bfirst-someB-square-knownA-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_circles_every_square.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                        ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 55],   //1177-reverse-disj-Afirst-someB-circle-mixedAB-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_circle_three_squares.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                        ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 55],   //1178-reverse-disj-Bfirst-someB-circle-mixedAB-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_squares_every_circle.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                        ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 55],   //1179-reverse-disj-Afirst-someB-circle-mixedAB-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_circle_three_squares.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                        ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 55],   //1180-reverse-disj-Bfirst-someB-circle-mixedAB-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_squares_every_circle.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                        ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 56],   //1181-reverse-disj-Afirst-someB-square-mixedAB-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_square_three_circles.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                        ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 56],   //1182-reverse-disj-Bfirst-someB-square-mixedAB-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_circles_every_square.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                        ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 56],   //1183-reverse-disj-Afirst-someB-square-mixedAB-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_square_three_circles.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                        ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 56],   //1184-reverse-disj-Bfirst-someB-square-mixedAB-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_circles_every_square.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                        ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 57],   //1185-reverse-disj-Afirst-someB-circle-conjunctiveB-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_circle_three_squares.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                        ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 57],   //1186-reverse-disj-Bfirst-someB-circle-conjunctiveB-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_squares_every_circle.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                        ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 57],   //1187-reverse-disj-Afirst-someB-circle-conjunctiveB-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_circle_three_squares.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                        ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 57],   //1188-reverse-disj-Bfirst-someB-circle-conjunctiveB-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_squares_every_circle.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                        ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 58],   //1189-reverse-disj-Afirst-someB-square-conjunctiveB-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_square_three_circles.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                        ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 58],   //1190-reverse-disj-Bfirst-someB-square-conjunctiveB-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_circles_every_square.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                        ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 58],   //1191-reverse-disj-Afirst-someB-square-conjunctiveB-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_square_three_circles.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                        ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 58],   //1192-reverse-disj-Bfirst-someB-square-conjunctiveB-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_circles_every_square.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                        ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 59],   //1193-reverse-disj-Afirst-someB-circle-knownB-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_circle_three_squares.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                        ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 59],   //1194-reverse-disj-Bfirst-someB-circle-knownB-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_squares_every_circle.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                        ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 59],   //1195-reverse-disj-Afirst-someB-circle-knownB-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_circle_three_squares.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                        ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 59],   //1196-reverse-disj-Bfirst-someB-circle-knownB-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_squares_every_circle.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                        ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 60],   //1197-reverse-disj-Afirst-someB-square-knownB-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_square_three_circles.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                        ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 60],   //1198-reverse-disj-Bfirst-someB-square-knownB-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_circles_every_square.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                        ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 60],   //1199-reverse-disj-Afirst-someB-square-knownB-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_square_three_circles.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                        ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 60],   //1200-reverse-disj-Bfirst-someB-square-knownB-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_circles_every_square.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                        ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 61],   //1201-reverse-disj-Afirst-someA-circle-conjunctiveA-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_circle_three_squares.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                        ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 61],   //1202-reverse-disj-Bfirst-someA-circle-conjunctiveA-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_squares_every_circle.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                        ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 61],   //1203-reverse-disj-Afirst-someA-circle-conjunctiveA-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_circle_three_squares.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                        ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 61],   //1204-reverse-disj-Bfirst-someA-circle-conjunctiveA-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_squares_every_circle.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                        ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 62],   //1205-reverse-disj-Afirst-someA-square-conjunctiveA-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_square_three_circles.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                        ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 62],   //1206-reverse-disj-Bfirst-someA-square-conjunctiveA-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_circles_every_square.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                        ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 62],   //1207-reverse-disj-Afirst-someA-square-conjunctiveA-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_square_three_circles.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                        ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 62],   //1208-reverse-disj-Bfirst-someA-square-conjunctiveA-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_circles_every_square.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                        ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 63],   //1209-reverse-disj-Afirst-someA-circle-knownA-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_circle_three_squares.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                        ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 63],   //1210-reverse-disj-Bfirst-someA-circle-knownA-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_squares_every_circle.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                        ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 63],   //1211-reverse-disj-Afirst-someA-circle-knownA-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_circle_three_squares.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                        ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 63],   //1212-reverse-disj-Bfirst-someA-circle-knownA-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_squares_every_circle.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                        ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 64],   //1213-reverse-disj-Afirst-someA-square-knownA-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_square_three_circles.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                        ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 64],   //1214-reverse-disj-Bfirst-someA-square-knownA-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_circles_every_square.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                        ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 64],   //1215-reverse-disj-Afirst-someA-square-knownA-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_square_three_circles.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                        ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 64],   //1216-reverse-disj-Bfirst-someA-square-knownA-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_circles_every_square.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                        ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 65],   //1217-reverse-disj-Afirst-someA-circle-mixedAB-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_circle_three_squares.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                        ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 65],   //1218-reverse-disj-Bfirst-someA-circle-mixedAB-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_squares_every_circle.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                        ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 65],   //1219-reverse-disj-Afirst-someA-circle-mixedAB-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_circle_three_squares.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                        ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 65],   //1220-reverse-disj-Bfirst-someA-circle-mixedAB-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_squares_every_circle.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                        ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 66],   //1221-reverse-disj-Afirst-someA-square-mixedAB-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_square_three_circles.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                        ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 66],   //1222-reverse-disj-Bfirst-someA-square-mixedAB-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_circles_every_square.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                        ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 66],   //1223-reverse-disj-Afirst-someA-square-mixedAB-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_square_three_circles.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                        ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 66],   //1224-reverse-disj-Bfirst-someA-square-mixedAB-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_circles_every_square.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                        ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 67],   //1225-reverse-disj-Afirst-someA-circle-conjunctiveB-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_circle_three_squares.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                        ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 67],   //1226-reverse-disj-Bfirst-someA-circle-conjunctiveB-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_squares_every_circle.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                        ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 67],   //1227-reverse-disj-Afirst-someA-circle-conjunctiveB-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_circle_three_squares.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                        ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 67],   //1228-reverse-disj-Bfirst-someA-circle-conjunctiveB-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_squares_every_circle.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                        ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 68],   //1229-reverse-disj-Afirst-someA-square-conjunctiveB-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_square_three_circles.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                        ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 68],   //1230-reverse-disj-Bfirst-someA-square-conjunctiveB-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_circles_every_square.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                        ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 68],   //1231-reverse-disj-Afirst-someA-square-conjunctiveB-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_square_three_circles.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                        ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 68],   //1232-reverse-disj-Bfirst-someA-square-conjunctiveB-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_circles_every_square.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                        ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 69],   //1233-reverse-disj-Afirst-someA-circle-knownB-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_circle_three_squares.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                        ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 69],   //1234-reverse-disj-Bfirst-someA-circle-knownB-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_squares_every_circle.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                        ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 69],   //1235-reverse-disj-Afirst-someA-circle-knownB-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_circle_three_squares.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                        ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 69],   //1236-reverse-disj-Bfirst-someA-circle-knownB-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_squares_every_circle.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                        ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 70],   //1237-reverse-disj-Afirst-someA-square-knownB-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_square_three_circles.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                        ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 70],   //1238-reverse-disj-Bfirst-someA-square-knownB-right
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_circles_every_square.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                        ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 70],   //1239-reverse-disj-Afirst-someA-square-knownB-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_every_square_three_circles.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                        ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 70],   //1240-reverse-disj-Bfirst-someA-square-knownB-left
                "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_second_sound_three_circles_every_square.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                        ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s


];
