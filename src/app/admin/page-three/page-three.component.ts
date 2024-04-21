import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Post, PostState } from '../../models/post.model';
import { AdminService } from '../admin.service';
import { addPost, deletePost, updatePost } from './state/list.action';
import { getPosts, getPostsById } from './state/list.selector';

@Component({
  selector: 'app-page-three',
  templateUrl: './page-three.component.html',
  styleUrl: './page-three.component.scss',
})
export class PageThreeComponent implements OnInit {
  posts$!: Observable<Post[]>;
  postForm!: FormGroup;
  toggleUpdate: boolean = false;
  selectedPost!: Post | null;
  constructor(
    private store: Store<PostState>,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private adminService: AdminService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.posts$ = this.store.select(getPosts);
    this.postForm = this.fb.group({
      id: '',
      title: this.fb.control(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: this.fb.control(null, Validators.required),
    });
  }

  get titleControl() {
    return this.postForm.get('title') as FormControl;
  }

  get descriptionControl() {
    return this.postForm.get('description') as FormControl;
  }

  openAddModal(content: TemplateRef<any>) {
    this.postForm.reset();
    const modalRef = this.modalService.open(content);
    modalRef.result.then(
      (result) => {
        this.toastrService.success('Details added successfully', 'Success', {
          timeOut: 3000,
        });
      },
      (reason) => {
        `Dismissed ${this.adminService.getDismissReason(reason)}`;
      }
    );
  }

  addDetails() {
    if (!this.postForm.valid) {
      return;
    }
    const post: Post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description,
    };
    this.store.dispatch(addPost({ post }));
    this.toastrService.success('Details added successfully', 'Success', {
      timeOut: 3000,
    });
    this.modalService.dismissAll();
  }

  updatePost(id: number | undefined, content: TemplateRef<any>) {
    this.toggleUpdate = true;

    //You can also send the post directly as param instead of id
    this.store.select(getPostsById(id)).subscribe((postData) => {
      this.selectedPost = postData ?? null;
      this.postForm.patchValue({
        title: postData?.title,
        description: postData?.description,
      });
    });

    const modalRef = this.modalService.open(content);
    modalRef.result.then((reason) => {
      this.toggleUpdate = false;
      `Dismissed ${this.adminService.getDismissReason(reason)}`;
    });
  }

  updateDetails() {
    if (!this.postForm.valid) {
      return;
    }
    const post: Post = {
      id: this.selectedPost?.id,
      title: this.postForm.value.title,
      description: this.postForm.value.description,
    };
    this.store.dispatch(updatePost({ post }));
    this.toastrService.success('Details updated successfully', 'Success', {
      timeOut: 3000,
    });
    this.modalService.dismissAll();
  }

  DeletePost(post: Post, deleteModal: TemplateRef<any>) {
    const modalRef = this.modalService.open(deleteModal);
    this.selectedPost = post;
    modalRef.result.then((result) => {
      if (post.id) {
        this.store.dispatch(deletePost({ id: post?.id }));
        this.toastrService.success('Details deleted successfully', 'Success', {
          timeOut: 3000,
        });
      }
    });
  }
}
