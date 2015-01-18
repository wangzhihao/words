<div class="flip-container"
    ng-class="{'flip': flip}"
    ng-click="toggleFlip()">
    <div class="flipper">
        <div class="front jumbotron">
            <p>
                <span class="label label-default">Context :</span>

                <span ng-bind="word.context"></span>
            </p>
        </div>
        <div class="back jumbotron">
            <p>
                <span class="label label-primary" ng-bind="word.name"></span>
            </p>
            <p>
                <span class="definition" ng-bind="word.definition"></span>
            </p>
            <div ng-if="word.examples.length">
                <span class="label label-default">Examples :</span>
                <p ng-repeat="example in word.examples">
                    <span ng-if="example.type === 'Text' " ng-bind="example.value"></span>
                    <img ng-if="example.type === 'Image'" ng-src="{{example.value}}">
                    <iframe ng-if="example.type === 'Video'" width="640" height="390" ng-src="{{example.value}}" frameborder="0" allowfullscreen></iframe>
                </p>
            </div>

            <div class="operations">
                <a class="search-on-google operation" ng-href="https://www.google.com/search?q=define+{{word.name}}" ng-click="$event.stopPropagation()" class="google-define" target="_blank" data-toggle="tooltip" data-placement="top" title="search on google" words-add-tooltip><span class="glyphicon glyphicon-search black" aria-hidden="true"></span></a>
                <a class="edit operation" ng-click="wordsCtrl.editWord(word); $event.stopPropagation()" data-toggle="tooltip" data-placement="top" title="edit it" words-add-tooltip><span class="glyphicon glyphicon-pencil black" aria-hidden="true"></span></a>
                <a class="delete operation" ng-click="wordsCtrl.removeWord(word); $event.stopPropagation()" data-toggle="tooltip" data-placement="top" title="delete it" words-add-tooltip><span class="glyphicon glyphicon-remove black" aria-hidden="true"></span></a>
            </div>
        </div>
        <div class="clear"></div>
    </div>
</div>
