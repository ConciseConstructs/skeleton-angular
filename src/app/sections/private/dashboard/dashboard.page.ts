import { Component } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { Quiz } from 'src/assets/models/Quiz.model';
import { QuizesProcessingService } from 'src/app/services/processors/quizes-processing/quizes.processing.service';
import { TagsProcessingService } from 'src/app/services/processors/tags-processing/tags.processing.service';
import { QuestionsProcessingService } from 'src/app/services/processors/questions-processing/questions.processing.service';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage extends ConciseComponent {

  public quiz:Quiz
  public quizes:Quiz[]


  constructor(
    public site:SiteService,
    public questionsService:QuestionsProcessingService,
    public quizesService:QuizesProcessingService,
    public tagsService:TagsProcessingService
  ) {
    super(site)
  }












  protected init() {
    try { this._init() }
    catch (error) {
      this.onError({ signature: '1103aa4c-28f1-4bc9-8679-6b1b1dc16fe8', details: error })
    }
  }




      private _init() {
        this.eventListeners.push(this.site.events.onNewQuizes.subscribe(quizes => this.onNewQuizes(quizes)))
      }












  private onNewQuizes(quizes) {
    try { this.quizes = quizes }
    catch (error) {
      this.onError({ signature: 'aa0cb613-c94e-4b7c-b612-fee54f2eb5cd', details: error })
    }
  }












  public onStartButtonClick() {
      try { this.site.router.navigate(['exam', this.quiz.id]) }
      catch (error) {
        this.onError({ signature: 'b32bb292-1deb-40f4-bb10-06082b910670', details: error })
      }
  }












  public onNewButtonClick(type) {
    try { this.site.router.navigate(['new', type]) }
    catch (error) {
      this.onError({ signature: '73ccaea0-fe10-4cce-8da9-8fd15c5a3810', details: error })
    }
  }












  public onNavigateButtonClick(location) {
    try { this.site.router.navigate([location]) }
    catch (error) {
      this.onError({ signature: 'e05b7f92-a136-48ba-b921-25b73c7c0b7f', details: error })
    }
  }

}
